"use client"
import getProducts from "@/services/products/getProducts";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import type { Product } from "@/types/Product";
import Image from "next/image";


export default function DraggableLists({ products, maxItemsPerRow = 3 }: { products: Product[], maxItemsPerRow?: number }) {
    const itemsMap = useRef({} as Record<number, Product>);

    // split into rows of maxItemsPerRow items each
    const [items, updateItems] = useState(products.reduce((acc, product, index) => {
        const row = Math.floor(index / maxItemsPerRow);
        if (!acc[row]) {
            acc[row] = [];
        }
        acc[row].push(product);
        itemsMap.current[product.id] = product;
        return acc;
    }, [] as Product[][]));
    const [sourceRowId, setSourceRowId] = useState("")


    const unshiftRow = useCallback(() => {
        const clonedItems = [...items.map(row => [...row])];
        clonedItems.unshift([]);
        updateItems(clonedItems);
    }, [items]);

    const onDragEnd = useCallback((result: DropResult) => {
        if (!result.destination) {
            return;
        }

        if (result.type === "row") {
            const clonedItems = [...items.map(row => [...row])];
            const [removed] = clonedItems.splice(result.source.index, 1);
            clonedItems.splice(result.destination.index, 0, removed);
            updateItems(clonedItems);
            return;
        }
        const sourceRow = Number(result.source.droppableId);
        const destRow = Number(result.destination.droppableId);
        const sourceIndex = result.source.index;
        const destIndex = result.destination.index;
        if (sourceRow === destRow) {
            if (sourceIndex === destIndex) {
                return;
            }

        } else if (items[destRow].length >= maxItemsPerRow) {
            return;
        }
        const clonedItems = [...items.map(row => [...row])];
        const [removed] = clonedItems[sourceRow].splice(sourceIndex, 1);
        clonedItems[destRow].splice(destIndex, 0, removed);
        updateItems(clonedItems);
    }, [items, maxItemsPerRow])
    const addRow = useCallback((index: number) => () => {
        const clonedItems = [...items.map(row => [...row])];
        clonedItems.splice(index + 1, 0, []);
        updateItems(clonedItems);
    }, [items]);

    const removeRow = useCallback((index: number) => () => {
        const clonedItems = [...items.map(row => [...row])];
        clonedItems.splice(index, 1);
        updateItems(clonedItems);
    }, [items]);

    const clearEmptyRows = useCallback(() => {
        const clonedItems = [...items.filter(row => row.length).map(row => [...row])];
        updateItems(clonedItems);
    }, [items]);

    const addProduct = useCallback((index: number) => async () => {
        const clonedItems = [...items.map(row => [...row])];
        let randomId = Math.floor(Math.random() * 1000);
        while (itemsMap.current[randomId]) {
            randomId = Math.floor(Math.random() * 1000);
        }
        const randomProduct = await getProducts([randomId]);
        clonedItems[index].push(randomProduct[0]);
        updateItems(clonedItems);
    }, [items]);

    return (
        <div>
            <div className="flex justify-center">
                <h1 className="text-4xl font-bold">Tools</h1>
                <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={unshiftRow}>
                    Unshift row
                </button>
                <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={clearEmptyRows}>
                    Clear empty rows
                </button>
            </div>
            <div><h2>Parent of draggable lists</h2>
                <DragDropContext onDragEnd={onDragEnd}
                    onDragStart={(result) => {
                        console.log("drag start", result)
                        setSourceRowId(result.source.droppableId)
                    }}
                    onDragUpdate={(result) => {
                        console.log("drag update", result)
                    }}>
                    <Droppable droppableId="all-rows" direction="vertical" type="row">
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} className={`${snapshot.isDraggingOver ? "bg-yellow-500" : "bg-purple-500"} min-h-[200px]`} {...provided.droppableProps} >
                                {items.map((row, rowIndex) => (
                                    <Draggable key={rowIndex} draggableId={`${rowIndex}`} index={rowIndex}>
                                        {(provided) => {
                                            return (
                                                <div
                                                    {...provided.draggableProps}
                                                    ref={provided.innerRef}
                                                    className="draggable-row"
                                                >
                                                    <h3 {...provided.dragHandleProps}>{`Row ${rowIndex + 1}`}</h3>

                                                    <Droppable key={rowIndex} droppableId={`${rowIndex}`} direction="horizontal">
                                                        {(provided, snapshot) => {
                                                            const isSameRow = sourceRowId === `${rowIndex}`;
                                                            const bgColor = row.length < 3 || isSameRow ? "bg-green-500" : "bg-red-500";
                                                            return (
                                                                <div ref={provided.innerRef} className={`flex ${snapshot.isDraggingOver ? bgColor : "bg-blue-500"} min-h-[200px]`} {...provided.droppableProps} >

                                                                    {row.map((product, index) => (
                                                                        <Draggable key={product.id} draggableId={(product.name)} index={index}>
                                                                            {(provided) => {
                                                                                return (
                                                                                    <div ref={provided.innerRef}
                                                                                        {...provided.draggableProps}
                                                                                        {...provided.dragHandleProps}
                                                                                        className={`m-2`}
                                                                                    >
                                                                                        <Link
                                                                                            href={{ pathname: "/products", query: { products: [product.id] } }}
                                                                                            className="rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                                                                                            rel="noopener noreferrer"
                                                                                        >
                                                                                            {product.name}
                                                                                        </Link>
                                                                                        <Image src={product.image} alt={product.name} width={product.imageWidth} height={product.imageHeight}/>
                                                                                        <span>{product.price}€</span>
                                                                                    </div>
                                                                                )
                                                                            }}
                                                                        </Draggable>
                                                                    ))}
                                                                    {provided.placeholder}
                                                                    <div className="flex flex-col justify-center">
                                                                        {row.length < 3 &&
                                                                            <button className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addProduct(rowIndex)}>
                                                                                Add product
                                                                            </button>}
                                                                        {row.length === 0
                                                                            ? (
                                                                                <button className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                                                    onClick={removeRow(rowIndex)}>
                                                                                    remove row</button>
                                                                            )
                                                                            : (<button className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                                                onClick={addRow(rowIndex)}>
                                                                                add row</button>)}
                                                                    </div>
                                                                </div>
                                                            )
                                                        }}
                                                    </Droppable>
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

            </div>
        </div>

    )
}