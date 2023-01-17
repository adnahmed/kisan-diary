import type { CellChange, Row } from "@silevis/reactgrid";
import { ReactGrid } from "@silevis/reactgrid";
import type { FC } from "react";
import {
  HeaderRow,
  ROW_HEIGHT,
  nonEditable,
  numberCell,
  textCell,
} from "~/components/spreadsheet/CellTypes";
import { OperationRow } from "~/components/spreadsheet/OperationRow";
import { Columns } from "~/components/spreadsheet/TitleColumn";
import {
  boldText,
  emptyTextCell,
} from "../../components/spreadsheet/CellTypes";
export const handle = {
  menu__item: "/farmer/crops",
};
export interface PostHarvestingProps {}
const Rows: Row[] = [
  OperationRow,
  HeaderRow("Post Harvesting"),
  {
    rowId: "1",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Bags")),
      numberCell(0),
      numberCell(0),
      numberCell(0),
    ],
  },
  {
    rowId: "2",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Storage")),
      numberCell(0),
      numberCell(0),
      numberCell(0),
    ],
  },
  {
    rowId: "3",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(boldText(textCell("Total Cost"))),
      nonEditable(emptyTextCell),
      numberCell(0),
      numberCell(0),
    ],
  },
];
const PostHarvesting: FC<PostHarvestingProps> = () => {
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
    <div className="PostHarvesting">
      {" "}
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

export default PostHarvesting;
