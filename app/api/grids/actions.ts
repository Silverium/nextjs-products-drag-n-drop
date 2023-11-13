"use server";

import postGrids from "@/services/grids/postGrids";
import updateGrid from "@/services/grids/updateGrid";
import { Grid } from "@/types/Grid";
import { revalidatePath } from 'next/cache'

export async function createGrid(prevState: any, formData: FormData) {
  try {
    const parsedGrid = JSON.parse(
      formData.get("grid")?.toString() || ""
    ) as Grid;
    if (parsedGrid.some((row) => row.items.length === 0)) {
      return {
        message:
          "Grid must have at least one product per row. Please clear empty rows",
      };
    }
    if (parsedGrid.some((row) => !row.template)) {
      return {
        message:
          "Grid must have a template per row. Please select a template for each row",
      };
    }

    const gridId = formData.get("gridId")?.toString();
    if (gridId) {
      await updateGrid({ id: gridId, grid: parsedGrid });
      revalidatePath(`/grids?grid=${gridId}`)
      revalidatePath(`/products?grid=${gridId}`)
      revalidatePath(`/grids`)
      return { success: 1, id: gridId };
    }

    const [id] = await postGrids([parsedGrid]);
    revalidatePath(`/grids?grid=${gridId}`)
    revalidatePath(`/products?grid=${gridId}`)
    revalidatePath(`/grids`)
    return { success: 1, id };
  } catch (error) {
    console.error(error);
    return { message: error?.toString() };
  }
}
