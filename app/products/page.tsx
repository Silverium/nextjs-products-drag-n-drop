import getProducts from "@/services/products/getProducts";
import dynamic from "next/dynamic";
const DraggableLists = dynamic(() => import("@/components/DraggableLists"), { ssr: false });
export default async function ProductsPage({ searchParams: { products: productIds } }: { searchParams: { products: number[] } }) {

    const products = await getProducts(productIds);
    return (
        <section className="min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-bold">Products drag n drop</h1>
            <DraggableLists products={products} />
        </section>
    )
}