import ProductCard from "@/components/ProductCard";
import getGrids from "@/services/grids/getGrids";
import { GridDbItem } from "@/types/Grid";
import getTemplateStyle from "@/utils/style/getTemplateStyle";
import Link from "next/link";

export default async function ProductsPage({ searchParams: { grid: gridIds } }: { searchParams: { grid: string[] | string } }) {

    const gridIdsArray: string[] = Array.isArray(gridIds) ? gridIds : [];
    if (typeof gridIds === "string") {
        gridIdsArray.push(gridIds)
    }

    const [grids]: [GridDbItem[]] = await Promise.all([getGrids(gridIdsArray)]);

    return (
        <section className="min-h-screen sm:p-2 md:p-4 lg:p-8 xl:p-16 2xl:p-32 w-100">
            <h1 className="text-4xl font-bold mb-8 text-center">Grids</h1>
            <div className="relative gap-8 container self-center">
                {grids.map(({ grid, id }) => (
                    <div key={id} className="flex flex-col gap-2 border border-dashed border-gray-500 p-8">
                        <div className="flex gap-2">
                            <Link
                                href={`/products?grid=${id}`}
                                title={id}
                                className=" rounded self-start p-2 border border-transparent transition-colors border-gray-400 hover:border-gray-700 bg-gray-100 hover:bg-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 hover:dark:text-white dark:text-black"
                            >
                                Edit in Products page
                            </Link>
                            <Link
                                href={`/grids?grid=${id}`}
                                title={id}
                                className=" rounded self-start p-2 border border-transparent transition-colors border-gray-400 hover:border-gray-700 bg-gray-100 hover:bg-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 hover:dark:text-white dark:text-black"
                            >
                                Show standalone
                            </Link>
                        </div>
                        <div className="flex flex-col gap-8">
                            {grid.map((row, index) => (
                                <div key={index} className={`flex w-100 ${getTemplateStyle(row.template)} gap-2 `}>
                                    {row.items.map(product => (
                                        <div key={product.id} className={`w-100`}>
                                            <ProductCard product={product} />
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