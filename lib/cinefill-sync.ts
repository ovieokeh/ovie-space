export const CINEFILL_SYNC_SCHEMA_VERSION = 1;

export type SyncCollectionKey =
  | "diaryEntries"
  | "watchlistItems"
  | "episodeStandouts";

export type SyncEnvelope<T> = {
  accepted: Record<SyncCollectionKey, string[]>;
  changes: Record<SyncCollectionKey, T[]>;
};

export type SyncBaseRecord = {
  syncId: string;
  updatedAt: number;
  deletedAt: number | null;
  lastModifiedDeviceId: string;
};

export type DiaryEntryRecord = SyncBaseRecord & {
  tmdbId: number;
  mediaType: "movie" | "tv_season";
  seasonNumber: number | null;
  seasonName: string | null;
  title: string;
  year: string | null;
  posterPath: string | null;
  watchedDate: string;
  rating: number;
  note: string;
  createdAt: number;
};

export type WatchlistItemRecord = SyncBaseRecord & {
  tmdbId: number;
  mediaType: "movie" | "tv";
  title: string;
  year: string | null;
  posterPath: string | null;
  addedAt: number;
};

export type EpisodeStandoutRecord = SyncBaseRecord & {
  tmdbId: number;
  seasonNumber: number;
  episodeNumber: number;
  episodeName: string;
  showTitle: string;
  posterPath: string | null;
  markedAt: number;
};

export type AnySyncRecord =
  | DiaryEntryRecord
  | EpisodeStandoutRecord
  | WatchlistItemRecord;

export type SyncRequest = {
  schemaVersion: 1;
  deviceId: string;
  cursor: string | null;
  changes: {
    diaryEntries: DiaryEntryRecord[];
    watchlistItems: WatchlistItemRecord[];
    episodeStandouts: EpisodeStandoutRecord[];
  };
};

export type SyncResponse = {
  schemaVersion: 1;
  serverTime: string;
  nextCursor: string;
  accepted: {
    diaryEntries: string[];
    watchlistItems: string[];
    episodeStandouts: string[];
  };
  changes: {
    diaryEntries: DiaryEntryRecord[];
    watchlistItems: WatchlistItemRecord[];
    episodeStandouts: EpisodeStandoutRecord[];
  };
};

export function emptySyncBuckets<T>() {
  return {
    diaryEntries: [] as T[],
    watchlistItems: [] as T[],
    episodeStandouts: [] as T[],
  };
}

export function syncUpdatedAtWindow(cursor: string | null, upperBound: string) {
  const untilUpperBound = { updatedAt: { less_than_equal: upperBound } };
  if (!cursor) return untilUpperBound;
  return {
    and: [
      { updatedAt: { greater_than: cursor } },
      untilUpperBound,
    ],
  };
}

export function isIncomingNewer(
  incoming: SyncBaseRecord,
  existing: SyncBaseRecord | null,
): boolean {
  if (!existing) return true;
  if (incoming.updatedAt !== existing.updatedAt) {
    return incoming.updatedAt > existing.updatedAt;
  }
  return incoming.lastModifiedDeviceId > existing.lastModifiedDeviceId;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function asString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function asNullableString(value: unknown): string | null | undefined {
  return value === null || typeof value === "string" ? value : undefined;
}

function asNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function asNullableNumber(value: unknown): number | null | undefined {
  return value === null || (typeof value === "number" && Number.isFinite(value))
    ? value
    : undefined;
}

function baseRecord(input: Record<string, unknown>): SyncBaseRecord | null {
  const syncId = asString(input.syncId);
  const updatedAt = asNumber(input.updatedAt);
  const deletedAt = asNullableNumber(input.deletedAt);
  const lastModifiedDeviceId = asString(input.lastModifiedDeviceId);
  if (!syncId || updatedAt == null || deletedAt === undefined || !lastModifiedDeviceId) {
    return null;
  }
  return { syncId, updatedAt, deletedAt, lastModifiedDeviceId };
}

export function normalizeDiaryEntryRecord(input: unknown): DiaryEntryRecord | null {
  if (!isRecord(input)) return null;
  const base = baseRecord(input);
  const tmdbId = asNumber(input.tmdbId);
  const seasonNumber = asNullableNumber(input.seasonNumber);
  const seasonName = asNullableString(input.seasonName);
  const title = asString(input.title);
  const year = asNullableString(input.year);
  const posterPath = asNullableString(input.posterPath);
  const watchedDate = asString(input.watchedDate);
  const rating = asNumber(input.rating);
  const note = asString(input.note);
  const createdAt = asNumber(input.createdAt);
  const mediaType = input.mediaType;
  if (
    !base ||
    tmdbId == null ||
    seasonNumber === undefined ||
    seasonName === undefined ||
    !title ||
    year === undefined ||
    posterPath === undefined ||
    !watchedDate ||
    rating == null ||
    note == null ||
    createdAt == null ||
    (mediaType !== "movie" && mediaType !== "tv_season")
  ) {
    return null;
  }
  return {
    ...base,
    tmdbId,
    mediaType,
    seasonNumber,
    seasonName,
    title,
    year,
    posterPath,
    watchedDate,
    rating,
    note,
    createdAt,
  };
}

export function normalizeWatchlistItemRecord(input: unknown): WatchlistItemRecord | null {
  if (!isRecord(input)) return null;
  const base = baseRecord(input);
  const tmdbId = asNumber(input.tmdbId);
  const title = asString(input.title);
  const year = asNullableString(input.year);
  const posterPath = asNullableString(input.posterPath);
  const addedAt = asNumber(input.addedAt);
  const mediaType = input.mediaType;
  if (
    !base ||
    tmdbId == null ||
    !title ||
    year === undefined ||
    posterPath === undefined ||
    addedAt == null ||
    (mediaType !== "movie" && mediaType !== "tv")
  ) {
    return null;
  }
  return { ...base, tmdbId, mediaType, title, year, posterPath, addedAt };
}

export function normalizeEpisodeStandoutRecord(
  input: unknown,
): EpisodeStandoutRecord | null {
  if (!isRecord(input)) return null;
  const base = baseRecord(input);
  const tmdbId = asNumber(input.tmdbId);
  const seasonNumber = asNumber(input.seasonNumber);
  const episodeNumber = asNumber(input.episodeNumber);
  const episodeName = asString(input.episodeName);
  const showTitle = asString(input.showTitle);
  const posterPath = asNullableString(input.posterPath);
  const markedAt = asNumber(input.markedAt);
  if (
    !base ||
    tmdbId == null ||
    seasonNumber == null ||
    episodeNumber == null ||
    !episodeName ||
    !showTitle ||
    posterPath === undefined ||
    markedAt == null
  ) {
    return null;
  }
  return {
    ...base,
    tmdbId,
    seasonNumber,
    episodeNumber,
    episodeName,
    showTitle,
    posterPath,
    markedAt,
  };
}

export function normalizeSyncRequest(input: unknown): SyncRequest | null {
  if (!isRecord(input)) return null;
  if (input.schemaVersion !== CINEFILL_SYNC_SCHEMA_VERSION) return null;
  const deviceId = asString(input.deviceId);
  const cursor = asNullableString(input.cursor);
  if (!deviceId || cursor === undefined || !isRecord(input.changes)) return null;

  const diaryEntries = input.changes.diaryEntries;
  const watchlistItems = input.changes.watchlistItems;
  const episodeStandouts = input.changes.episodeStandouts;
  if (
    !Array.isArray(diaryEntries) ||
    !Array.isArray(watchlistItems) ||
    !Array.isArray(episodeStandouts)
  ) {
    return null;
  }

  const normalizedDiary = diaryEntries.map(normalizeDiaryEntryRecord);
  const normalizedWatchlist = watchlistItems.map(normalizeWatchlistItemRecord);
  const normalizedStandouts = episodeStandouts.map(normalizeEpisodeStandoutRecord);
  if (
    normalizedDiary.some((v) => v == null) ||
    normalizedWatchlist.some((v) => v == null) ||
    normalizedStandouts.some((v) => v == null)
  ) {
    return null;
  }

  return {
    schemaVersion: CINEFILL_SYNC_SCHEMA_VERSION,
    deviceId,
    cursor,
    changes: {
      diaryEntries: normalizedDiary as DiaryEntryRecord[],
      watchlistItems: normalizedWatchlist as WatchlistItemRecord[],
      episodeStandouts: normalizedStandouts as EpisodeStandoutRecord[],
    },
  };
}
