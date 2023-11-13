import getGrids from "@/services/grids/getGrids";
import getProducts from "@/services/products/getProducts";
import getTemplates from "@/services/templates/getTemplates";
import dynamic from "next/dynamic";
const DraggableLists = dynamic(() => import("@/components/DraggableLists"), { ssr: false });
export default async function ProductsPage({ searchParams: { products: productIds, grid } }: { searchParams: { products: number[], grid: string } }) {

    type Products = Awaited<ReturnType<typeof getProducts>>;
    type Templates = Awaited<ReturnType<typeof getTemplates>>;
    type Grids = Awaited<ReturnType<typeof getGrids>>;
    const promises: Promise<Products | Templates | Grids>[] = [getProducts(productIds || []), getTemplates()];
    if (typeof grid === "string") {
        promises.push(getGrids([grid]));
    }
    const [products, templates, grids] = await Promise.all(promises);
    const gridItem = grids?.[0];
    return (
        <section className="min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-bold">Products drag n drop</h1>
            <DraggableLists products={products as Products} grid={gridItem as Grids[number]} templates={templates as Templates} />
        </section>
    )
}