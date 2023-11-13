import { Product } from "./Product";
import { Template } from "./Templates";

export type ProductRow = {
    items: Product[];
    template: Template
}

export type Grid = ProductRow[];
export type GridDbItem = {
    id: string;
    grid: Grid;
}
