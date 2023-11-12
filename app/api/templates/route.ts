import getTemplates from "@/services/templates/getTemplates";

 // exposed API route to get products by id. I am not sure if it will be needed.
export async function GET() {
  const products = await getTemplates();
  return Response.json(products);
}
