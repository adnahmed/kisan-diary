import type { FC } from "react";
import React from "react";
import CellRow from "./cell-row";
import "./CommonCostTableHeader.scss";

export interface CommonCostTableHeaderProps {}

const CommonCostTableHeader: FC<CommonCostTableHeaderProps> = (props) => (
  <>
    <CellRow
      style={{ fontWeight: "bold" }}
      values={[
        "Operation/Activity",
        "Best Practices",
        "Conventional Practices",
      ]}
    />
    <CellRow values={[""]} />
    <CellRow
      style={{ fontWeight: "bold" }}
      values={[
        "",
        <CellRow values={["Quantity", "Total Cost PKR"]} />,
        <CellRow values={["Quantity", "Total Cost PKR"]} />,
      ]}
    />
  </>
);

export default CommonCostTableHeader;
