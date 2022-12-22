import type { FC } from "react";
import React from "react";
import CellRow from "~/components/cell-row";

export interface IntegratedWeedManagementProps {}

const IntegratedWeedManagement: FC<IntegratedWeedManagementProps> = () => (
  <div className="IntegratedWeedManagement">
    <CellRow
      values={[
        "Weedicide",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
  </div>
);

export default IntegratedWeedManagement;
