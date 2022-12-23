import type { FC } from "react";
import React from "react";
import CellRow from "~/components/cell-row";

export interface SowingProps {}

const Sowing: FC<SowingProps> = () => (
  <div className="Sowing">
    <CellRow
      cellStyle={{ textAlign: "left" }}
      style={{ fontWeight: "bold" }}
      values={["Sowing"]}
    />
  </div>
);

export default Sowing;
