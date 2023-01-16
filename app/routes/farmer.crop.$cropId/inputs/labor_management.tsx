import type { CellChange, Row } from "@silevis/reactgrid";
import { ReactGrid } from "@silevis/reactgrid";
import type { FC } from "react";
import { ROW_HEIGHT, numberCell } from "~/components/spreadsheet/CellTypes";
import { OperationRow } from "~/components/spreadsheet/OperationRow";
import { Columns } from "~/components/spreadsheet/TitleColumn";
import {
  nonEditable,
  textCell,
} from "../../../components/spreadsheet/CellTypes";

export interface LaborManagementProps {}
const Rows: Row[] = [
  OperationRow,
  {
    rowId: "1",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Labor Management")),
      numberCell(0),
      numberCell(0),
      numberCell(0),
    ],
  },
];
const LaborManagement: FC<LaborManagementProps> = () => {
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
    <div className="LaborManagement">
      <div className="Irrigation">
        <ReactGrid
          rows={Rows}
          columns={Columns}
          onCellsChanged={handleChanges}
          stickyTopRows={1}
          enableFillHandle
          enableRangeSelection
        />
      </div>
    </div>
  );
};

export default LaborManagement;
