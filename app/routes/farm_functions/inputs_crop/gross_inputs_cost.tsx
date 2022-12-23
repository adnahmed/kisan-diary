import type { FC } from "react";
import React from "react";
import CellRow from "~/components/cell-row";
import IntegratedDiseaseManagement from "./integrated_disease_management";
import IntegratedPestManagement from "./integrated_pest_management";
import IntegratedWeedManagement from "./integrated_weed_management";
import Irrigation from "./Irrigation";
import LaborManagement from "./labor_management";
import NutrientManagement from "./nutrient_management";
import Seed from "./Seed";

export interface GrossInputsCostProps {}

const GrossInputsCost: FC<GrossInputsCostProps> = () => (
  <div className="GrossInputsCost">
    <Seed />
    <Irrigation />
    <LaborManagement />
    <IntegratedPestManagement />
    <IntegratedDiseaseManagement />
    <IntegratedWeedManagement />
    <NutrientManagement />
    <CellRow
      style={{ fontWeight: "bold" }}
      values={[
        "Gross Input Cost",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
    <CellRow
      style={{ fontWeight: "bold" }}
      values={[
        "Cost of Growing Total (A+B)",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
  </div>
);

export default GrossInputsCost;
