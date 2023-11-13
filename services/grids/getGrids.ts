import { GridDbItem } from "@/types/Grid";
import { createClient } from "@vercel/kv";

export default async function getGrids(
  gridIds: string[] = []
): Promise<GridDbItem[]> {
  const gridsDB = createClient({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  });
  const allGrids = [];
  if (gridIds.length > 0) {
    for (const gridId of gridIds) {
      const grid = await gridsDB.get(gridId);
      allGrids.push(grid);
    }

    return Promise.all(allGrids) as Promise<GridDbItem[]>;
  }

  for await (const key of gridsDB.scanIterator()) {
    const grid = gridsDB.get(key);
    allGrids.push(grid);
  }

  return Promise.all(allGrids) as Promise<GridDbItem[]>;
}
