import { getPayload } from "payload";

import config from "@/payload.config";
import {
  CINEFILL_SYNC_SCHEMA_VERSION,
  emptySyncBuckets,
  isIncomingNewer,
  normalizeSyncRequest,
  syncUpdatedAtWindow,
  type AnySyncRecord,
  type DiaryEntryRecord,
  type EpisodeStandoutRecord,
  type SyncBaseRecord,
  type SyncCollectionKey,
  type SyncResponse,
  type WatchlistItemRecord,
} from "@/lib/cinefill-sync";

type CollectionSlug =
  | "cinefill-diary-entries"
  | "cinefill-watchlist-items"
  | "cinefill-episode-standouts";

type PayloadClient = Awaited<ReturnType<typeof getPayload>>;

type ServerDoc = Record<string, unknown> & {
  id: number | string;
  syncId: string;
  clientUpdatedAt: number;
  clientDeletedAt?: number | null;
  lastModifiedDeviceId: string;
};

type CollectionSpec<T extends AnySyncRecord> = {
  key: SyncCollectionKey;
  collection: CollectionSlug;
  toData: (record: T) => Record<string, unknown>;
  fromDoc: (doc: ServerDoc) => T;
};

const baseToData = (record: SyncBaseRecord) => ({
  syncId: record.syncId,
  clientUpdatedAt: record.updatedAt,
  clientDeletedAt: record.deletedAt,
  lastModifiedDeviceId: record.lastModifiedDeviceId,
});

const baseFromDoc = (doc: ServerDoc): SyncBaseRecord => ({
  syncId: doc.syncId,
  updatedAt: Number(doc.clientUpdatedAt),
  deletedAt: typeof doc.clientDeletedAt === "number" ? doc.clientDeletedAt : null,
  lastModifiedDeviceId: String(doc.lastModifiedDeviceId),
});

const diarySpec: CollectionSpec<DiaryEntryRecord> = {
  key: "diaryEntries",
  collection: "cinefill-diary-entries",
  toData: (record) => ({
    ...baseToData(record),
    tmdbId: record.tmdbId,
    mediaType: record.mediaType,
    seasonNumber: record.seasonNumber,
    seasonName: record.seasonName,
    title: record.title,
    year: record.year,
    posterPath: record.posterPath,
    watchedDate: record.watchedDate,
    rating: record.rating,
    note: record.note,
    clientCreatedAt: record.createdAt,
  }),
  fromDoc: (doc) => ({
    ...baseFromDoc(doc),
    tmdbId: Number(doc.tmdbId),
    mediaType: doc.mediaType === "tv_season" ? "tv_season" : "movie",
    seasonNumber: typeof doc.seasonNumber === "number" ? doc.seasonNumber : null,
    seasonName: typeof doc.seasonName === "string" ? doc.seasonName : null,
    title: String(doc.title),
    year: typeof doc.year === "string" ? doc.year : null,
    posterPath: typeof doc.posterPath === "string" ? doc.posterPath : null,
    watchedDate: String(doc.watchedDate),
    rating: Number(doc.rating),
    note: String(doc.note ?? ""),
    createdAt: Number(doc.clientCreatedAt),
  }),
};

const watchlistSpec: CollectionSpec<WatchlistItemRecord> = {
  key: "watchlistItems",
  collection: "cinefill-watchlist-items",
  toData: (record) => ({
    ...baseToData(record),
    tmdbId: record.tmdbId,
    mediaType: record.mediaType,
    title: record.title,
    year: record.year,
    posterPath: record.posterPath,
    addedAt: record.addedAt,
  }),
  fromDoc: (doc) => ({
    ...baseFromDoc(doc),
    tmdbId: Number(doc.tmdbId),
    mediaType: doc.mediaType === "tv" ? "tv" : "movie",
    title: String(doc.title),
    year: typeof doc.year === "string" ? doc.year : null,
    posterPath: typeof doc.posterPath === "string" ? doc.posterPath : null,
    addedAt: Number(doc.addedAt),
  }),
};

const standoutSpec: CollectionSpec<EpisodeStandoutRecord> = {
  key: "episodeStandouts",
  collection: "cinefill-episode-standouts",
  toData: (record) => ({
    ...baseToData(record),
    tmdbId: record.tmdbId,
    seasonNumber: record.seasonNumber,
    episodeNumber: record.episodeNumber,
    episodeName: record.episodeName,
    showTitle: record.showTitle,
    posterPath: record.posterPath,
    markedAt: record.markedAt,
  }),
  fromDoc: (doc) => ({
    ...baseFromDoc(doc),
    tmdbId: Number(doc.tmdbId),
    seasonNumber: Number(doc.seasonNumber),
    episodeNumber: Number(doc.episodeNumber),
    episodeName: String(doc.episodeName),
    showTitle: String(doc.showTitle),
    posterPath: typeof doc.posterPath === "string" ? doc.posterPath : null,
    markedAt: Number(doc.markedAt),
  }),
};

const SPECS = [diarySpec, watchlistSpec, standoutSpec] as const;
const PULL_PAGE_SIZE = 500;

function isAuthorized(req: Request): boolean {
  const token = process.env.CINEFILL_SYNC_TOKEN;
  const header = req.headers.get("authorization");
  return Boolean(token && header === `Bearer ${token}`);
}

async function findBySyncId(
  payload: PayloadClient,
  collection: CollectionSlug,
  syncId: string,
): Promise<ServerDoc | null> {
  const result = await payload.find({
    collection,
    limit: 1,
    overrideAccess: true,
    pagination: false,
    where: { syncId: { equals: syncId } },
  });
  return ((result.docs as unknown as ServerDoc[])[0]) ?? null;
}

async function upsertRecord<T extends AnySyncRecord>(
  payload: PayloadClient,
  spec: CollectionSpec<T>,
  record: T,
  existing: ServerDoc | null,
): Promise<void> {
  const data = spec.toData(record);
  if (existing) {
    await payload.update({
      collection: spec.collection,
      id: existing.id,
      data: data as never,
      overrideAccess: true,
    });
    return;
  }
  await payload.create({
    collection: spec.collection,
    data: data as never,
    draft: false,
    overrideAccess: true,
  });
}

async function pullChanged<T extends AnySyncRecord>(
  payload: PayloadClient,
  spec: CollectionSpec<T>,
  cursor: string | null,
  upperBound: string,
): Promise<T[]> {
  const docs: ServerDoc[] = [];
  let page = 1;

  while (true) {
    const result = await payload.find({
      collection: spec.collection,
      limit: PULL_PAGE_SIZE,
      overrideAccess: true,
      page,
      sort: "updatedAt",
      where: syncUpdatedAtWindow(cursor, upperBound),
    });

    docs.push(...((result.docs as unknown as ServerDoc[]) ?? []));
    if (!result.hasNextPage || !result.nextPage) break;
    page = result.nextPage;
  }

  return docs.map(spec.fromDoc);
}

function mergeBySyncId<T extends AnySyncRecord>(items: T[]): T[] {
  return [...new Map(items.map((item) => [item.syncId, item])).values()];
}

export async function POST(req: Request): Promise<Response> {
  if (!process.env.CINEFILL_SYNC_TOKEN) {
    return Response.json(
      { error: "CINEFILL_SYNC_TOKEN is not configured" },
      { status: 500 },
    );
  }
  if (!isAuthorized(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const syncRequest = normalizeSyncRequest(body);
  if (!syncRequest) {
    return Response.json({ error: "Invalid sync request" }, { status: 400 });
  }

  const payload = await getPayload({ config });
  const accepted = emptySyncBuckets<string>();
  const forcedChanges = emptySyncBuckets<AnySyncRecord>();

  for (const spec of SPECS) {
    for (const record of syncRequest.changes[spec.key] as AnySyncRecord[]) {
      const existing = await findBySyncId(payload, spec.collection, record.syncId);
      const existingBase = existing ? baseFromDoc(existing) : null;
      if (isIncomingNewer(record, existingBase)) {
        await upsertRecord(payload, spec as CollectionSpec<AnySyncRecord>, record, existing);
        accepted[spec.key].push(record.syncId);
      } else if (existing) {
        forcedChanges[spec.key].push(
          (spec as CollectionSpec<AnySyncRecord>).fromDoc(existing),
        );
      }
    }
  }

  const nextCursor = new Date().toISOString();
  const diaryEntries = mergeBySyncId([
    ...(forcedChanges.diaryEntries as DiaryEntryRecord[]),
    ...(await pullChanged(payload, diarySpec, syncRequest.cursor, nextCursor)),
  ]);
  const watchlistItems = mergeBySyncId([
    ...(forcedChanges.watchlistItems as WatchlistItemRecord[]),
    ...(await pullChanged(payload, watchlistSpec, syncRequest.cursor, nextCursor)),
  ]);
  const episodeStandouts = mergeBySyncId([
    ...(forcedChanges.episodeStandouts as EpisodeStandoutRecord[]),
    ...(await pullChanged(payload, standoutSpec, syncRequest.cursor, nextCursor)),
  ]);

  return Response.json({
    schemaVersion: CINEFILL_SYNC_SCHEMA_VERSION,
    serverTime: nextCursor,
    nextCursor,
    accepted,
    changes: { diaryEntries, watchlistItems, episodeStandouts },
  } satisfies SyncResponse);
}
