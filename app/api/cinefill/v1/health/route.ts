import { CINEFILL_SYNC_SCHEMA_VERSION } from "@/lib/cinefill-sync";

function isAuthorized(req: Request): boolean {
  const token = process.env.CINEFILL_SYNC_TOKEN;
  const header = req.headers.get("authorization");
  return Boolean(token && header === `Bearer ${token}`);
}

export async function GET(req: Request): Promise<Response> {
  if (!process.env.CINEFILL_SYNC_TOKEN) {
    return Response.json(
      { error: "CINEFILL_SYNC_TOKEN is not configured" },
      { status: 500 },
    );
  }
  if (!isAuthorized(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return Response.json({
    ok: true,
    schemaVersion: CINEFILL_SYNC_SCHEMA_VERSION,
    serverTime: new Date().toISOString(),
  });
}
