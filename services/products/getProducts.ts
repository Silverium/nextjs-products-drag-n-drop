export default async function getProducts(ids: number[]): Promise<Product[]> {
    // this can connect to any database and return the data
    // for now we mock it
    const products: Product[] = ids.map((id) => {
        return {
            id,
            name: `Product ${id}`,
            price: Math.round(Math.random() * 100),
            description: `This is the description of product ${id}`,
            image: `https://source.unsplash.com/random/200x300/?fashion=1&id=${id}`,
            imageWidth: 200,
        };
    }
    );
    return products
}