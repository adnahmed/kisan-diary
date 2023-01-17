import type { CellChange, Row } from "@silevis/reactgrid";
import { ReactGrid } from "@silevis/reactgrid";
import type { FC } from "react";
import {
  nonEditable,
  numberCell,
  showZero,
} from "~/components/spreadsheet/CellTypes";
import { OperationRow } from "~/components/spreadsheet/OperationRow";
import { Columns } from "~/components/spreadsheet/TitleColumn";
import {
  ROW_HEIGHT,
  textCell,
} from "../../../components/spreadsheet/CellTypes";

export interface SeedProps {}
export const handle = {
  menu__item: "/farmer/crops",
};
export interface SowingProps {}

const Rows: Row[] = [
  OperationRow,
  {
    rowId: "1",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Seed")),
      showZero(numberCell(0)),
      showZero(numberCell(0)),
      numberCell(0),
    ],
  },
];

const Seed: FC<SeedProps> = () => {
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
    <div className="Seed">
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

export default Seed;
