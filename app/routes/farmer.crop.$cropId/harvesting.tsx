import type { FC } from "react";
import React from "react";
import CellRow from "~/components/cell-row";
export const handle = {
  menu__item: "/farmer/crops",
};
export interface HarvestingProps {}

const Harvesting: FC<HarvestingProps> = () => (
  <div className="Harvesting">
    <CellRow
      cellStyle={{ textAlign: "left" }}
      style={{ fontWeight: "bold" }}
      values={["Harvesting"]}
    />
    <CellRow
      values={[
        "Labor for digging, sorting/grading and filling",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
    <CellRow
      values={[
        "Yield (Kg)",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
    <CellRow
      values={[
        "Total Yield (kg) (A+B+C+D)",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
    <CellRow
      values={[
        "Total Quality wise (A+B+C) without Seed",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
    <CellRow
      values={[
        "A Quality",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
    <CellRow
      values={[
        "B Quality",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
    <CellRow
      values={[
        "Mix ( C )",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
    <CellRow
      values={[
        "Seed ( D )",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
    <CellRow
      style={{ fontWeight: "bold" }}
      values={[
        "Total Gross Harvesting Cost",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
  </div>
);

export default Harvesting;
