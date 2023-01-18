import type { Column } from "@silevis/reactgrid";
import { COL_WIDTH } from "./CellTypes";

export const Columns: Column[] = [
  {
    columnId: "nameColumn",
    width: 500,
  },
  { columnId: "quantity", width: COL_WIDTH },
  { columnId: "unitCost", width: COL_WIDTH },
  { columnId: "totalCost", width: COL_WIDTH },
];
