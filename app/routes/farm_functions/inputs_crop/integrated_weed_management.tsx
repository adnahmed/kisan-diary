import React, { FC } from "react";
import CellRow from "~/components/CellRow";

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
