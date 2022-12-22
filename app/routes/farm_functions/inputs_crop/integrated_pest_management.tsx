import type { FC } from "react";
import React from "react";
import CellRow from "~/components/cell-row";

export interface IntegratedPestManagementProps {}

const IntegratedPestManagement: FC<IntegratedPestManagementProps> = () => (
  <div className="IntegratedPestManagement">
    <CellRow
      values={[
        "Pesticide",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
  </div>
);

export default IntegratedPestManagement;
