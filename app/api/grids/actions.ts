"use server";

import postGrids from "@/services/grids/postGrids";
import { Grid } from "@/types/Grid";

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

    const ids = await postGrids([parsedGrid]);
    return { success: 1, ids };
  } catch (error) {
    console.error(error);
    return { message: error?.toString() };
  }
}
