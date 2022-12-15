import React, { FC } from "react";
import CellRow from "~/components/CellRow";

export interface IrrigationProps {}

const irrigationTable = [
  "Number of Irrigations",
  "Total Cost of Irrigation",
  "Cost of Irrigation (Rs. Per acre)",
];
const Irrigation: FC<IrrigationProps> = () => (
  <div className="Irrigation">
    {irrigationTable.map((val) => {
      return (
        <CellRow
          values={[
            val,
            <CellRow values={["", ""]} />,
            <CellRow values={["", ""]} />,
          ]}
        />
      );
    })}
  </div>
);
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
