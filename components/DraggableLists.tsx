"use client"
import getProducts from "@/services/products/getProducts";
import { LegacyRef, useCallback, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult, DraggingStyle } from 'react-beautiful-dnd';
import type { Product } from "@/types/Product";
import { Template } from "@/types/Templates";
import { LuMoveVertical } from "react-icons/lu";
import TemplatesSelector from "./TemplatesSelector";
import { Grid, GridDbItem } from "@/types/Grid";
import { useFormState } from "react-dom";
import { createGrid } from "@/app/api/grids/actions";
import getTemplateStyle from "@/utils/style/getTemplateStyle";
import ProductCard from "./ProductCard";
import productsSettings from "@/settings/products";

export default function DraggableLists({ products, maxItemsPerRow = 3, templates, grid }: { products?: Product[], maxItemsPerRow?: number, templates: Template[], grid?: GridDbItem }) {
    const [zoom, setZoom] = useState<number>(100);
    const isDragDisabled = zoom !== 100;
    const itemsMap = useRef({} as Record<number, Product>);

    // split into rows of maxItemsPerRow items each
    const [gridState, updateGridState] = useState(grid ? grid.grid : (products || []).reduce((acc, product, index) => {
        const row = Math.floor(index / maxItemsPerRow);
        if (!acc[row]) {
            acc[row] = { items: [], template: templates[0] };
        }
        acc[row].items.push(product);
        itemsMap.current[product.id] = product;
        return acc;
    }, [] as Grid));
    const [sourceRowId, setSourceRowId] = useState("")


    const unshiftRow = useCallback(() => {
        const clonedItems = [...gridState.map(row => ({ items: [...row.items], template: row.template }))];
        clonedItems.unshift({ items: [], template: templates[0] });
        updateGridState(clonedItems);
    }, [gridState, templates]);

    const onDragEnd = useCallback((result: DropResult) => {
        if (!result.destination) {
            return;
        }

        if (result.type === "row") {
            const clonedItems = [...gridState.map(row => ({ items: [...row.items], template: row.template }))];
            const [removed] = clonedItems.splice(result.source.index, 1);
            clonedItems.splice(result.destination.index, 0, removed);
            updateGridState(clonedItems);
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

        } else if (gridState[destRow].items.length >= maxItemsPerRow) {
            return;
        }
        const clonedItems = [...gridState.map(row => ({ items: [...row.items], template: row.template }))];
        const [removed] = clonedItems[sourceRow].items.splice(sourceIndex, 1);
        clonedItems[destRow].items.splice(destIndex, 0, removed);
        updateGridState(clonedItems);
    }, [gridState, maxItemsPerRow])
    const addRow = useCallback((index: number) => () => {
        const clonedItems = [...gridState.map(row => ({ items: [...row.items], template: row.template }))];
        clonedItems.splice(index + 1, 0, { items: [], template: templates[0] });
        updateGridState(clonedItems);
    }, [gridState, templates]);

    const removeRow = useCallback((index: number) => () => {
        const clonedItems = [...gridState.map(row => ({ items: [...row.items], template: row.template }))];
        clonedItems.splice(index, 1);
        updateGridState(clonedItems);
    }, [gridState]);

    const clearEmptyRows = useCallback(() => {
        const clonedItems = [...gridState.filter(row => row.items.length)];
        updateGridState(clonedItems);
    }, [gridState]);

    const addProduct = useCallback((index: number) => async () => {
        const clonedItems = [...gridState.map(row => ({ items: [...row.items], template: row.template }))];
        let randomId = Math.floor(Math.random() * 1000);
        while (itemsMap.current[randomId]) {
            randomId = Math.floor(Math.random() * 1000);
        }
        const randomProduct = await getProducts([randomId]);
        clonedItems[index].items.push(randomProduct[0]);
        updateGridState(clonedItems);
    }, [gridState]);

    const handleTemplateSelect = useCallback((index: number) => (template: Template) => {
        const clonedItems = [...gridState.map(row => ({ items: [...row.items], template: row.template }))];
        clonedItems[index].template = template;
        updateGridState(clonedItems);
    }
        , [gridState]);

    const editorRef = useRef<HTMLDivElement>(null);
    const editorMeasures = editorRef.current?.getBoundingClientRect();
    const [formState, formAction] = useFormState(createGrid, { message: null })

    return (
        <div>
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold self-center">Tools</h1>
                <div className="grid grid-cols-2 gap-2 justify-center lg:m-4 md:grid-cols-3 lg:flex">

                <span title="Due to the drag and drop library implementation, there is a bug that prevents from dragging scaled elements. Reset Zoom to enable the drag and drop functionality" className={`${isDragDisabled ? "bg-red-400 text-white" : "bg-green-400 text-black"} self-center py-2 px-4 ml-4 rounded`}>Drag {isDragDisabled ? "disabled" : "enabled"}</span>
                <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={unshiftRow}>
                    Unshift row
                </button>
                <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={clearEmptyRows}>
                    Clear empty rows
                </button>
                <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
                    setZoom((zoom + 10));
                }}>
                    Zoom in
                </button>
                <button className={`ml-4 ${zoom <= 10 ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded`} onClick={() => {
                    setZoom(Math.max(10, (zoom - 10)));
                }}>
                    Zoom out
                </button>
                <button className={`ml-4 ${zoom === 100 ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded`} onClick={() => {
                    setZoom(100);
                }
                }>
                    Reset zoom from {zoom}%
                </button>
                <form action={formAction}>
                    <input type="hidden" name="grid" value={JSON.stringify(gridState)} />
                    <input type="hidden" name="gridId" value={grid?.id || formState.id} />
                    <button className={`ml-4 ${formState.success ? "bg-green-400" : "bg-blue-500"} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`} type="submit">
                        Save
                    </button>
                    <span className="text-red-500 m-2">{formState?.message}</span>
                </form>
                </div>
            </div>
            <div id="editor" ref={editorRef as LegacyRef<HTMLDivElement>} className="relative " style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: "top left",
            }}>

                <DragDropContext onDragEnd={onDragEnd}
                    onDragStart={(result) => {
                        setSourceRowId(result.source.droppableId)
                    }}
                >
                    <Droppable droppableId="all-rows" direction="vertical" type="row" >
                        {(provided) => (
                            <div ref={provided.innerRef} className={`rounded-tl rounded-tr  text-black min-h-[200px]`} {...provided.droppableProps} >
                                {gridState.map((row, rowIndex) => (
                                    <Draggable key={rowIndex} draggableId={`${rowIndex}`} index={rowIndex} isDragDisabled={isDragDisabled}>
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    {...provided.draggableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        // Calculate and compensate for the shift of the editor relative position
                                                        ...provided.draggableProps.style,
                                                        ...editorMeasures && snapshot.isDragging && {
                                                            top: `${(provided.draggableProps.style as DraggingStyle)?.top - editorMeasures.y}px`,
                                                            left: `${(provided.draggableProps.style as DraggingStyle)?.left - editorMeasures.x}px`,
                                                        }
                                                    }}
                                                    className={`draggable-row rounded ${snapshot.isDragging ? "bg-green-100" : "bg-purple-100"}`}
                                                >
                                                    <div className="flex justify-between items-center rounded-tl rounded-tr border-3" {...provided.dragHandleProps}>
                                                        <i className="p-2 font-black text-lg"><LuMoveVertical /></i>
                                                        <h3 >{`Row ${rowIndex + 1}`}</h3>
                                                        <div className="flex justify-center">
                                                            <TemplatesSelector templates={templates} onSelect={handleTemplateSelect(rowIndex)} selectedTemplate={row.template} />
                                                            <button className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addRow(rowIndex)}>
                                                                add row
                                                            </button>
                                                            <button className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={removeRow(rowIndex)}>
                                                                remove row
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <Droppable key={rowIndex} droppableId={`${rowIndex}`} direction="horizontal">
                                                        {(provided, snapshot) => {
                                                            const isSameRow = sourceRowId === `${rowIndex}`;
                                                            const bgColor = row.items.length < 3 || isSameRow ? "bg-green-500" : "bg-red-500";
                                                            return (
                                                                <div ref={provided.innerRef} className={`flex ${snapshot.isDraggingOver ? bgColor : "bg-slate-100 dark:bg-black"} ${getTemplateStyle(row.template)} relative min-h-[${productsSettings.imageHeight + 50}px]`} {...provided.droppableProps}
                                                                >

                                                                    {row.items.map((product, index) => (
                                                                        <Draggable key={product.id} draggableId={(product.name)} index={index} isDragDisabled={isDragDisabled}>
                                                                            {(provided, snapshot) => {
                                                                                const newHeight = ((provided.draggableProps.style as DraggingStyle)?.height || 0) / zoom * 100;
                                                                                const newWidth = ((provided.draggableProps.style as DraggingStyle)?.width || 0) / zoom * 100;
                                                                                return (
                                                                                    <div ref={provided.innerRef}
                                                                                        {...provided.draggableProps}
                                                                                        {...provided.dragHandleProps}
                                                                                        style={{
                                                                                            // Calculate and compensate for the shift of the editor relative position
                                                                                            ...provided.draggableProps.style,
                                                                                            ...editorMeasures && snapshot.isDragging && {
                                                                                                top: `${(provided.draggableProps.style as DraggingStyle)?.top - editorMeasures.y}px`,
                                                                                                left: `${(provided.draggableProps.style as DraggingStyle)?.left - editorMeasures.x}px`,
                                                                                                transformOrigin: "top left",
                                                                                                height: `${newHeight}px`,
                                                                                                width: `${newWidth}px`,
                                                                                            }
                                                                                        }}
                                                                                        className={`m-2`}
                                                                                    >
                                                                                        <ProductCard product={product} />
                                                                                    </div>
                                                                                )
                                                                            }}
                                                                        </Draggable>
                                                                    ))}
                                                                    {provided.placeholder}
                                                                    {row.items.length < 3 &&
                                                                        <button className={`m-2 bg-gray-200 text-black border-2 border-gray-500 border-dashed hover:bg-gray-700 hover:text-white font-bold py-2 px-4 rounded min-w-[${productsSettings.imageWidth}px]`} onClick={addProduct(rowIndex)} style={{
                                                                            height: `${productsSettings.imageHeight + 50}px`
                                                                        }}>
                                                                            Add product
                                                                        </button>}
                                                                    <div className="flex flex-col justify-center">
                                                                        {row.items.length === 0
                                                                            && (
                                                                                <button className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                                                    onClick={removeRow(rowIndex)}>
                                                                                    remove row</button>
                                                                            )
                                                                        }
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