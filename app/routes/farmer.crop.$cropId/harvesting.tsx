import type { LinksFunction } from "@remix-run/node";
import type { CellChange, Column, Row } from "@silevis/reactgrid";
import { ReactGrid } from "@silevis/reactgrid";
import type { FC } from "react";
import {
  COL_WIDTH,
  HeaderRow,
  ROW_HEIGHT,
  nonEditable,
  numberCell,
} from "~/components/spreadsheet/CellTypes";
import { OperationRow } from "~/components/spreadsheet/OperationRow";
import { Columns } from "~/components/spreadsheet/TitleColumn";
import styles from "~/styles/routes/farmer.crop.harvesting.css";
import {
  boldText,
  emptyTextCell,
  textCell,
} from "../../components/spreadsheet/CellTypes";
export const handle = {
  menu__item: "/farmer/crops",
};
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};
export interface HarvestingProps {}

const Rows: Row[] = [
  OperationRow,
  HeaderRow("Harvesting"),
  {
    rowId: "1",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Labor for digging, sorting/grading and filling")),
      numberCell(0),
      numberCell(0),
      numberCell(0),
    ],
  },

  {
    rowId: "9",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(boldText(textCell("Total Gross Harvesting Cost"))),
      nonEditable(emptyTextCell),
      nonEditable(emptyTextCell),
      numberCell(0),
    ],
  },
];
export const YieldColumns: Column[] = [
  {
    columnId: "titlesColumn",
    width: 500,
  },
  { columnId: 1, width: COL_WIDTH },
];

const Harvesting: FC<HarvestingProps> = () => {
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
    <div className="crop__card card__harvesting">
      <ReactGrid
        rows={Rows}
        columns={Columns}
        onCellsChanged={handleChanges}
        stickyTopRows={1}
        enableFillHandle
        enableRangeSelection
      />
      <ReactGrid
        rows={YieldRows}
        columns={YieldColumns}
        onCellsChanged={handleChanges}
        stickyTopRows={1}
        enableFillHandle
        enableRangeSelection
      />
    </div>
  );
};

export default Harvesting;

const YieldRows: Row[] = [
  {
    rowId: "header",
    height: ROW_HEIGHT,
    cells: [
      boldText(textCell("Operation/Activity")),
      boldText(textCell("Quantity")),
    ],
  },
  HeaderRow("Yield"),
  {
    rowId: "1",
    height: ROW_HEIGHT,
    cells: [nonEditable(textCell("Yield (Kg)")), numberCell(0)],
  },

  {
    rowId: "4",
    height: ROW_HEIGHT,
    cells: [nonEditable(textCell("A Quality")), numberCell(0)],
  },
  {
    rowId: "5",
    height: ROW_HEIGHT,
    cells: [nonEditable(textCell("B Quality")), numberCell(0)],
  },
  {
    rowId: "6",
    height: ROW_HEIGHT,
    cells: [nonEditable(textCell("Mix ( C )")), numberCell(0)],
  },
  {
    rowId: "3",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(
        boldText(textCell("Total Quality wise (A+B+C) without Seed"))
      ),
      numberCell(0),
    ],
  },
  {
    rowId: "7",
    height: ROW_HEIGHT,
    cells: [nonEditable(textCell("Seed ( D )")), numberCell(0)],
  },

  {
    rowId: "2",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(boldText(textCell("Total Yield (kg) (A+B+C+D)"))),
      numberCell(0),
    ],
  },
];
