export default async function getProducts(ids: number[]): Promise<Product[]> {
    // this can connect to any database and return the data
    // for now we mock it
    const products: Product[] = ids.map((id) => {
        return {
            id,
            name: `Product ${id}`,
            price: Math.round(Math.random() * 100),
            description: `This is the description of product ${id}`,
            image: `https://picsum.photos/200/320?random=${id}`,
        };
    }
    );
    return products
}