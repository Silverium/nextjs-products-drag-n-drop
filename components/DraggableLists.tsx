"use client"
import Link from "next/link";
import { useCallback, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

export default function DraggableLists({ products }: { products: Product[] }) {
    const [items, updateItems] = useState(products);
    const onDragEnd = useCallback((result: DropResult) => {
        if (!result.destination) {
            return;
        }
        if (result.destination.index === result.source.index) {
            return;
          }
        const newItems = Array.from(items);
        const [reorderedItem] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, reorderedItem);
        updateItems(newItems);
    }, [items])
    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={() => console.log("drag start")}
            onDragUpdate={() => console.log("drag update")}>
            <Droppable droppableId="droppable-1" direction="horizontal">
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} className={`flex ${snapshot.isDraggingOver ? "bg-red-500" : "bg-blue-500"}`} {...provided.droppableProps} >
                        
                        {items.map((product, index) => (
                            <Draggable key={product.id} draggableId={(product.name)} index={index}>
                                {(provided, snapshot) => {
                                    return (
                                        <div ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className=""
                                        >
                                            <Link
                                                href={{ pathname: "/products", query: { products: [product.id] } }}
                                                className="rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                                                rel="noopener noreferrer"
                                            >
                                                {product.name}
                                            </Link>
                                            <img src={product.image} alt={product.name} />
                                            <span>{product.price}€</span>
                                        </div>
                                    )
                                }}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>

    )
}