import type { CellChange, Row } from "@silevis/reactgrid";
import { ReactGrid } from "@silevis/reactgrid";
import type { FC } from "react";
import { Columns } from "~/components/spreadsheet/TitleColumn";
import {
  ROW_HEIGHT,
  nonEditable,
  numberCell,
  textCell,
} from "../../../components/spreadsheet/CellTypes";
import { OperationRow } from "../../../components/spreadsheet/OperationRow";

export interface IrrigationProps {}

const Rows: Row[] = [
  OperationRow,
  {
    rowId: "1",
    height: ROW_HEIGHT,
    cells: [
      nonEditable(textCell("Irrigation")),
      numberCell(0),
      numberCell(0),
      numberCell(0),
    ],
  },
];

const Irrigation: FC<IrrigationProps> = () => {
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
  );
};
/*
*
 'Labor cost',
      'Weedicide',
      'Pesticide',
      'Fertilizers (NPK)',
      'Micros Nutrients'

      <CellRow cellStyle={{fontWeight: 'bold'}} values={['Gross Input Cost', '', '', '', '']}/>
      <CellRow cellStyle={{fontWeight: 'bold'}} values={['Cost of Growing Total (A+B)', '', '', '', '']}/>

*
* */

export default Irrigation;
