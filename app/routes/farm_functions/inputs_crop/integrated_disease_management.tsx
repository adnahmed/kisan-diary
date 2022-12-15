import React, { FC } from "react";
import CellRow from "~/components/CellRow";

export interface IntegratedDiseaseManagementProps {}

const IntegratedDiseaseManagement: FC<
  IntegratedDiseaseManagementProps
> = () => (
  <div className="IntegratedDiseaseManagement">
    <CellRow
      values={[
        "Disease",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
  </div>
);

export default IntegratedDiseaseManagement;
