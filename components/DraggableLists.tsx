"use client"
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

export default function DraggableLists({ products }: { products: Product[] }) {

    // split into rows of 3 items each
    const [items, updateItems] = useState(products.reduce((acc, product, index) => {
        const row = Math.floor(index / 3);
        if (!acc[row]) {
            acc[row] = [];
        }
        acc[row].push(product);
        return acc;
    }, [] as Product[][]));
    const [imageLinks, setImageLinks] = useState({} as Record<number, string> );

    useEffect(() => {
        // Fetch and store image links for each element
        const fetchImageLinks = async () => {
            const updatedImageLinks: Record<number, string> = {};
            await Promise.all(products.map(async (element) => {
                const response = await fetch(element.image);
                updatedImageLinks[element.id] = response.url;
            }));
            setImageLinks(updatedImageLinks);
        };

        fetchImageLinks();
    }, [products]);
    const onDragEnd = useCallback((result: DropResult) => {
        if (!result.destination) {
            return;
        }

        console.log(result.destination)
        const clonedItems = [...items.map(row => [...row])];
        const sourceRow = Number(result.source.droppableId);
        const destRow = Number(result.destination.droppableId);
        const sourceIndex = result.source.index;
        const [removed] = clonedItems[sourceRow].splice(sourceIndex, 1);
        const destIndex = result.destination.index;
        clonedItems[destRow].splice(destIndex, 0, removed);
        updateItems(clonedItems);
    }, [items])
    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={() => console.log("drag start")}
            onDragUpdate={(result) => console.log("drag update", result)}>
            {items.map((row, rowIndex) => (
                <Droppable key={rowIndex} droppableId={`${rowIndex}`} direction="horizontal">
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} className={`flex ${snapshot.isDraggingOver ? "bg-red-500" : "bg-blue-500"} min-h-[200px]`} {...provided.droppableProps} >

                            {row.map((product, index) => (
                                <Draggable key={product.id} draggableId={(product.name)} index={index}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`min-w-[${product.imageWidth}px] m-2`}
                                            >
                                                <Link
                                                    href={{ pathname: "/products", query: { products: [product.id] } }}
                                                    className="rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                                                    rel="noopener noreferrer"
                                                >
                                                    {product.name}
                                                </Link>
                                                <img src={`${imageLinks[product.id]}`} alt={product.name} width={product.imageWidth} />
                                                <span>{product.price}€</span>
                                            </div>
                                        )
                                    }}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>))}
        </DragDropContext>

    )
}