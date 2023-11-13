import getGrids from "@/services/grids/getGrids";
import getProducts from "@/services/products/getProducts";
import getTemplates from "@/services/templates/getTemplates";
import dynamic from "next/dynamic";
const DraggableLists = dynamic(() => import("@/components/DraggableLists"), { ssr: false });
export default async function ProductsPage({ searchParams: { products: productIds, grid } }: { searchParams: { products: string | string[], grid: string } }) {

    type Products = Awaited<ReturnType<typeof getProducts>>;
    type Templates = Awaited<ReturnType<typeof getTemplates>>;
    type Grids = Awaited<ReturnType<typeof getGrids>>;
    const productIdsArray: string[] = Array.isArray(productIds) ? productIds : [];
    if (typeof productIds === "string") {
        productIdsArray.push(productIds)
    }
    const promises: Promise<Products | Templates | Grids>[] = [getProducts(productIdsArray), getTemplates()];
    if (typeof grid === "string") {
        promises.push(getGrids([grid]));
    }
    const [products, templates, grids] = await Promise.all(promises);
    const gridItem = grids?.[0];
    return (
        <section className="min-h-screen flex flex-col items-center sm:p-2 md:p-4 lg:p-8 xl:p-16 2xl:p-32">
            <h1 className="text-4xl font-bold mb-8 text-center">Products drag n drop</h1>
            <DraggableLists products={products as Products} grid={gridItem as Grids[number]} templates={templates as Templates} />
        </section>
    )
}