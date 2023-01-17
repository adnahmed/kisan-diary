import type { Column } from "@silevis/reactgrid";
import { COL_WIDTH } from "./CellTypes";

export const Columns: Column[] = [
  {
    columnId: "titlesColumn",
    width: 500,
  },
  { columnId: 1, width: COL_WIDTH },
  { columnId: 2, width: COL_WIDTH },
  { columnId: 3, width: COL_WIDTH },
];
