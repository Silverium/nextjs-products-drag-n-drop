import getProducts from "@/services/products/getProducts";
import { type NextRequest } from "next/server";

 // exposed API route to get products by id. I am not sure if it will be needed.
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const ids = (searchParams.getAll("id") || []) as unknown as string[];
  const products = await getProducts(ids);
  return Response.json(products);
}
