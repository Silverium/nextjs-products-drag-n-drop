import productsSettings from "@/settings/products";
import type { Product } from "@/types/Product";

const { imageWidth, imageHeight } = productsSettings;

export default async function getProducts(ids: number[]): Promise<Product[]> {
    // this can connect to any database and return the data
    // for now we mock it
    const products: Product[] = ids.map((id) => {
        return {
            id,
            name: `Product ${id}`,
            price: Math.round(Math.random() * 100),
            description: `This is the description of product ${id}`,
            image: `https://source.unsplash.com/random/${imageWidth}x${imageHeight}/?fashion=1&id=${id}`,
            imageWidth,
            imageHeight,
        };
    }
    );
    return products
}