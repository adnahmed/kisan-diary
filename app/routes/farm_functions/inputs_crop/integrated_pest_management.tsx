import React, { FC } from "react";
import CellRow from "~/components/CellRow";

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
