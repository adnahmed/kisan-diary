import React, { FC } from "react";
import CellRow from "~/components/CellRow";

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
