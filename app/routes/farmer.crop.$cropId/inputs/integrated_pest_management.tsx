import type { CellChange, Row } from "@silevis/reactgrid";
import { ReactGrid } from "@silevis/reactgrid";
import type { FC } from "react";
import { OperationRow } from "~/components/spreadsheet/OperationRow";
import { Columns } from "~/components/spreadsheet/TitleColumn";
import {
  HeaderRow,
  ROW_HEIGHT,
  nonEditable,
  numberCell,
  textCell,
} from "../../../components/spreadsheet/CellTypes";

export interface IntegratedPestManagementProps {}
const Rows: Row[] = [
  OperationRow,
  HeaderRow("Integrated Pest Management"),
  {
    rowId: "1",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Pesticide")),
      numberCell(0),
      numberCell(0),
      numberCell(0),
    ],
  },
];
const IntegratedPestManagement: FC<IntegratedPestManagementProps> = () => {
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
    <div className="IntegratedPestManagement">
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

export default IntegratedPestManagement;
