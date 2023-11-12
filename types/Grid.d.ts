import { Product } from "./Product";
import { Template } from "./Templates";

export type ProductRow = {
    items: Product[];
    template: Template
}

export type Grid = ProductRow[]