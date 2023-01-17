import type { CellChange, Row } from "@silevis/reactgrid";
import { ReactGrid } from "@silevis/reactgrid";
import type { FC } from "react";
import {
  HeaderRow,
  ROW_HEIGHT,
  nonEditable,
  numberCell,
} from "~/components/spreadsheet/CellTypes";
import { OperationRow } from "~/components/spreadsheet/OperationRow";
import { Columns } from "~/components/spreadsheet/TitleColumn";
import { textCell } from "../../../components/spreadsheet/CellTypes";

export interface IntegratedWeedManagementProps {}
const Rows: Row[] = [
  OperationRow,
  HeaderRow("Integrated Weed Management"),
  {
    rowId: "1",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Weedicide")),
      numberCell(0),
      numberCell(0),
      numberCell(0),
    ],
  },
];
const IntegratedWeedManagement: FC<IntegratedWeedManagementProps> = () => {
  const handleChanges = (changes: CellChange[]) => {
    changes.forEach((change: CellChange) => {
      if (change.type === "number") {
        if (change.rowId === "" && change.columnId === 2) {
          console.log("newvalue:", change.newCell.value);
        }
      }
    });
  };
  return (
    <div className="IntegratedWeedManagement">
      <ReactGrid
        rows={Rows}
        columns={Columns}
        onCellsChanged={handleChanges}
        stickyTopRows={1}
        enableFillHandle
        enableRangeSelection
      />
    </div>
  );
};

export default IntegratedWeedManagement;
