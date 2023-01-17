import type { CellChange, Row } from "@silevis/reactgrid";
import { ReactGrid } from "@silevis/reactgrid";
import type { FC } from "react";
import {
  HeaderRow,
  ROW_HEIGHT,
  boldText,
  emptyTextCell,
  nonEditable,
  numberCell,
  textCell,
} from "~/components/spreadsheet/CellTypes";
import { OperationRow } from "~/components/spreadsheet/OperationRow";
import { Columns } from "~/components/spreadsheet/TitleColumn";
export const handle = {
  menu__item: "/farmer/crops",
};
export interface MarketingProps {}
const Rows: Row[] = [
  OperationRow,
  HeaderRow("Marketing"),
  {
    rowId: "1",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Transport")),
      numberCell(0),
      numberCell(0),
      numberCell(0),
    ],
  },
  {
    rowId: "2",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Loading and Unloading")),
      numberCell(0),
      numberCell(0),
      numberCell(0),
    ],
  },
  {
    rowId: "3",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Sales commission and market fee")),
      numberCell(0),
      numberCell(0),
      numberCell(0),
    ],
  },
  {
    rowId: "4",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(boldText(textCell("Total Marketing Cost"))),
      nonEditable(emptyTextCell),
      nonEditable(emptyTextCell),
      numberCell(0),
    ],
  },
];
const Marketing: FC<MarketingProps> = () => {
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
    <div className="Marketing">
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

export default Marketing;
