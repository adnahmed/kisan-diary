import React, { FC } from "react";
import CellRow from "~/components/CellRow";

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
