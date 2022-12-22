import type { FC } from "react";
import React from "react";
import CellRow from "~/components/cell-row";

export interface LaborManagementProps {}

const LaborManagement: FC<LaborManagementProps> = () => (
  <div className="LaborManagement">
    <CellRow
      values={[
        "Labor",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
  </div>
);

export default LaborManagement;
