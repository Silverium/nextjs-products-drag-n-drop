import getGrids from "@/services/grids/getGrids";
import { GridDbItem } from "@/types/Grid";
import getTemplateStyle from "@/utils/style/getTemplateStyle";
import Image from "next/image";
import Link from "next/link";

export default async function ProductsPage({ searchParams: { grid: gridIds } }: { searchParams: { grid: string[] | string } }) {

    const gridIdsArray: string[] = Array.isArray(gridIds) ? gridIds : [];
    if (typeof gridIds === "string") {
        gridIdsArray.push(gridIds)
    }

    const [grids]: [GridDbItem[]] = await Promise.all([getGrids(gridIdsArray)]);

    return (
        <section className="min-h-screen p-24">
            <h1 className="text-4xl font-bold">Grids</h1>
            <div className="relative gap-4">
                {grids.map(({ grid, id }) => (
                    <div key={id} className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold">{id}</h2>
                        <Link href={`/grids?grid=${id}`}>{id}</Link>
                        <div className="">
                            {grid.map((row, index) => (
                                <div key={index} className={`flex w-100 ${getTemplateStyle(row.template)} gap-2 `}>
                                    {row.items.map(product => (
                                        <div key={product.id} className={`w-100`}>
                                            <Link
                                                href={{ pathname: "/products", query: { products: [product.id] } }}
                                                className="rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                                                rel="noopener noreferrer"
                                            >
                                                {product.name}
                                            </Link>
                                            <Image src={product.image} alt={product.name} width={product.imageWidth} height={product.imageHeight} />
                                            <span>{product.price}€</span>
                                        </div>
                                    ))}
                                </div>
                            )
                            )}

                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}