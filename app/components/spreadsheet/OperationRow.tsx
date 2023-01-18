import type { Row, TextCell } from "@silevis/reactgrid";
import { boldText, nonEditable } from "./CellTypes";
export const OperationHeader: TextCell = {
  type: "text",
  text: "Operation/Activity",
  nonEditable: true,
  renderer: (text) => <b>{text}</b>,
};
export const OperationRow: Row = {
  rowId: "op_header",
  height: 50,
  cells: [
    OperationHeader,
    boldText(
      nonEditable({
        type: "text",
        text: "Quantity",
      }) as TextCell
    ),
    boldText(
      nonEditable({
        type: "text",
        text: "Unit Cost",
      }) as TextCell
    ),
    boldText(
      nonEditable({
        type: "text",
        text: "Total Cost",
      }) as TextCell
    ),
  ],
};
