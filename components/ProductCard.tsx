import { Product } from "@/types/Product";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const ProductCard: FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="product-card flex-col self-center">
      <Link
        href={{ pathname: "/products", query: { products: [product.id] } }}
        className="w-100 text-center block rounded-tl rounded-tr border border-transparent transition-colors hover:border-gray-300 bg-gray-100 hover:bg-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        rel="noopener noreferrer"
      >
        {product.name}
      </Link>
      <Image
        src={product.image}
        alt={product.name}
        width={product.imageWidth}
        height={product.imageHeight}
      />
      <span className="w-100 text-center block rounded-bl rounded-br border border-transparent transition-colors hover:border-gray-300 bg-gray-100 hover:bg-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 font-bold">{product.price}€</span>
    </div>
  );
};

export default ProductCard;
