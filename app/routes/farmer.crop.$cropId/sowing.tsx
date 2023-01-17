import { useCatch } from "@remix-run/react";
import type { CellChange, Row } from "@silevis/reactgrid";
import { ReactGrid } from "@silevis/reactgrid";
import type { FC } from "react";
import {
  nonEditable,
  numberCell,
  showZero,
} from "~/components/spreadsheet/CellTypes";
import { Columns } from "~/components/spreadsheet/TitleColumn";
import { ROW_HEIGHT, textCell } from "../../components/spreadsheet/CellTypes";
import { OperationRow } from "../../components/spreadsheet/OperationRow";
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
      nonEditable(textCell("Sowing")),
      showZero(numberCell(0)),
      showZero(numberCell(0)),
      numberCell(0),
    ],
  },
];

const Sowing: FC<SowingProps> = () => {
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
    <div className="Sowing">
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
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
}
export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}
export default Sowing;
