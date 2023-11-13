import getGrids from "@/services/grids/getGrids";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const ids = (searchParams.getAll("id") || []) as unknown as string[];
  const grids = await getGrids(ids);
  
  return Response.json(grids);
}
