import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  isIncomingNewer,
  normalizeSyncRequest,
  syncUpdatedAtWindow,
  type SyncBaseRecord,
} from "./cinefill-sync";

const base = (patch: Partial<SyncBaseRecord> = {}): SyncBaseRecord => ({
  syncId: "x",
  updatedAt: 100,
  deletedAt: null,
  lastModifiedDeviceId: "device-a",
  ...patch,
});

const diaryRecord = {
  syncId: "diary:1",
  tmdbId: 1,
  mediaType: "movie",
  seasonNumber: null,
  seasonName: null,
  title: "Film",
  year: "2024",
  posterPath: null,
  watchedDate: "2026-05-13",
  rating: 4,
  note: "",
  createdAt: 1,
  updatedAt: 2,
  deletedAt: null,
  lastModifiedDeviceId: "device-a",
};

describe("cinefill sync contract", () => {
  it("validates the v1 envelope and records", () => {
    const request = normalizeSyncRequest({
      schemaVersion: 1,
      deviceId: "device-a",
      cursor: null,
      changes: {
        diaryEntries: [diaryRecord],
        watchlistItems: [],
        episodeStandouts: [],
      },
    });
    assert.equal(request?.changes.diaryEntries[0]?.syncId, "diary:1");
  });

  it("rejects malformed records", () => {
    const request = normalizeSyncRequest({
      schemaVersion: 1,
      deviceId: "device-a",
      cursor: null,
      changes: {
        diaryEntries: [{ ...diaryRecord, rating: "five" }],
        watchlistItems: [],
        episodeStandouts: [],
      },
    });
    assert.equal(request, null);
  });

  it("uses updatedAt then device id for conflict ordering", () => {
    assert.equal(isIncomingNewer(base({ updatedAt: 101 }), base()), true);
    assert.equal(isIncomingNewer(base({ updatedAt: 99 }), base()), false);
    assert.equal(
      isIncomingNewer(
        base({ lastModifiedDeviceId: "device-z" }),
        base({ lastModifiedDeviceId: "device-a" }),
      ),
      true,
    );
  });

  it("builds a bounded updatedAt window for pull cursors", () => {
    assert.deepEqual(syncUpdatedAtWindow(null, "2026-05-13T10:00:00.000Z"), {
      updatedAt: { less_than_equal: "2026-05-13T10:00:00.000Z" },
    });
    assert.deepEqual(
      syncUpdatedAtWindow("2026-05-13T09:00:00.000Z", "2026-05-13T10:00:00.000Z"),
      {
        and: [
          { updatedAt: { greater_than: "2026-05-13T09:00:00.000Z" } },
          { updatedAt: { less_than_equal: "2026-05-13T10:00:00.000Z" } },
        ],
      },
    );
  });
});
