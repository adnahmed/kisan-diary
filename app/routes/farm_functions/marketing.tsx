import React, { FC } from "react";
import CellRow from "~/components/CellRow";

export interface MarketingProps {}

const Marketing: FC<MarketingProps> = () => (
  <div className="Marketing">
    <CellRow
      cellStyle={{ textAlign: "left" }}
      style={{ fontWeight: "bold" }}
      values={["Marketing"]}
    />
    <CellRow
      values={[
        "Transport",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
    <CellRow
      values={[
        "Loading and Unloading",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
    <CellRow
      values={[
        "Sales commission and market fee",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
    <CellRow
      style={{ fontWeight: "bold" }}
      values={[
        "Total Marketing Cost",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
  </div>
);

export default Marketing;
