import { Grid } from "@/types/Grid";
import { kv } from "@vercel/kv";
import crypto from "crypto";

export default async function postGrids(grids: Grid[]) {
  const ids: string[] = [];
  const promises = grids.map(async (grid) => {
    const uuid = crypto.randomUUID();
    ids.push(uuid);
    return kv.set(uuid, { grid, id: uuid });
  });
  await Promise.all(promises);

  return ids;
}
