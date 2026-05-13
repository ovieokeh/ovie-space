import type { Access, CollectionConfig, Field } from "payload";

const adminOnly: Access = ({ req }) => Boolean(req.user);

const syncFields: Field[] = [
  {
    name: "syncId",
    type: "text",
    required: true,
    unique: true,
    index: true,
  },
  {
    name: "clientUpdatedAt",
    type: "number",
    required: true,
    index: true,
  },
  {
    name: "clientDeletedAt",
    type: "number",
  },
  {
    name: "lastModifiedDeviceId",
    type: "text",
    required: true,
  },
];

const protectedAccess = {
  read: adminOnly,
  create: adminOnly,
  update: adminOnly,
  delete: adminOnly,
};

export const CinefillDiaryEntries: CollectionConfig = {
  slug: "cinefill-diary-entries",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "mediaType", "isPublic", "watchedDate", "clientUpdatedAt"],
  },
  access: protectedAccess,
  fields: [
    ...syncFields,
    { name: "tmdbId", type: "number", required: true, index: true },
    {
      name: "mediaType",
      type: "select",
      required: true,
      options: [
        { label: "Movie", value: "movie" },
        { label: "TV Season", value: "tv_season" },
      ],
    },
    { name: "seasonNumber", type: "number" },
    { name: "seasonName", type: "text" },
    { name: "title", type: "text", required: true },
    { name: "year", type: "text" },
    { name: "posterPath", type: "text" },
    { name: "watchedDate", type: "text", required: true, index: true },
    { name: "rating", type: "number", required: true },
    { name: "note", type: "textarea" },
    { name: "isPublic", type: "checkbox", defaultValue: false, index: true },
    { name: "clientCreatedAt", type: "number", required: true },
  ],
};

export const CinefillWatchlistItems: CollectionConfig = {
  slug: "cinefill-watchlist-items",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "mediaType", "isPublic", "addedAt", "clientUpdatedAt"],
  },
  access: protectedAccess,
  fields: [
    ...syncFields,
    { name: "tmdbId", type: "number", required: true, index: true },
    {
      name: "mediaType",
      type: "select",
      required: true,
      options: [
        { label: "Movie", value: "movie" },
        { label: "TV", value: "tv" },
      ],
    },
    { name: "title", type: "text", required: true },
    { name: "year", type: "text" },
    { name: "posterPath", type: "text" },
    { name: "isPublic", type: "checkbox", defaultValue: false, index: true },
    { name: "addedAt", type: "number", required: true, index: true },
  ],
};

export const CinefillEpisodeStandouts: CollectionConfig = {
  slug: "cinefill-episode-standouts",
  admin: {
    useAsTitle: "episodeName",
    defaultColumns: ["showTitle", "seasonNumber", "episodeNumber", "clientUpdatedAt"],
  },
  access: protectedAccess,
  fields: [
    ...syncFields,
    { name: "tmdbId", type: "number", required: true, index: true },
    { name: "seasonNumber", type: "number", required: true },
    { name: "episodeNumber", type: "number", required: true },
    { name: "episodeName", type: "text", required: true },
    { name: "showTitle", type: "text", required: true },
    { name: "posterPath", type: "text" },
    { name: "markedAt", type: "number", required: true, index: true },
  ],
};
