import getProducts from "@/services/products/getProducts";
import Link from "next/link";

export default async function ProductsPage({ searchParams: { products: productIds } }: { searchParams: { products: number[] } }) {

    const products = await getProducts(productIds);
    return (
        <section className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-bold">Products drag n drop</h1>
            <div className="relative flex place-items-center" >
                {products.map((product) => (
                    <div key={product.id} className="flex flex-col items-center justify-center">
                        <Link
                            href={{ pathname: "/products", query: { products: [product.id] } }}
                            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                            rel="noopener noreferrer"
                        >
                            {product.name}
                        </Link>
                        <img src={product.image} alt={product.name} />
                        <span>{product.price}€</span>
                        </div>
                ))}
            </div>
        </section>
    )
}