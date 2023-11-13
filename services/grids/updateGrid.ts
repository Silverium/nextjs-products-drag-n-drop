import { GridDbItem } from "@/types/Grid";
import { kv } from "@vercel/kv";

export default async function updateGrid(grid: GridDbItem) {
  try {
    await kv.set(grid.id, grid);

    return grid.id;
  } catch (error) {
    return { message: error?.toString() };
  }
}
