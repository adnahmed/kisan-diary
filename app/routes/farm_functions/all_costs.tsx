import React, { FC } from "react";
import CellRow from "~/components/cell-row";
import Harvesting from "./harvesting";
import GrossInputsCost from "./inputs_crop/gross_inputs_cost";
import IntegratedDiseaseManagement from "./inputs_crop/integrated_disease_management";
import IntegratedPestManagement from "./inputs_crop/integrated_pest_management";
import IntegratedWeedManagement from "./inputs_crop/integrated_weed_management";
import Irrigation from "./inputs_crop/Irrigation";
import LaborManagement from "./inputs_crop/labor_management";
import NutrientManagement from "./inputs_crop/nutrient_management";
import Seed from "./inputs_crop/Seed";
import LandPreparation from "./land_preparation";
import Marketing from "./marketing";
import PostHarvesting from "./post_harvesting";
import Sowing from "./sowing";
interface AllCostsProps {}

const AllCosts: FC<AllCostsProps> = () => (
  <div className="AllCosts">
    <LandPreparation />
    <Sowing />
    <CellRow
      values={["Inputs"]}
      cellStyle={{ textAlign: "left" }}
      style={{ fontWeight: "bold" }}
    />
    <Seed />
    <Irrigation />
    <LaborManagement />
    <IntegratedPestManagement />
    <IntegratedDiseaseManagement />
    <IntegratedWeedManagement />
    <NutrientManagement />
    <GrossInputsCost />
    <Harvesting />
    <PostHarvesting />
    <Marketing />
    <CellRow
      values={[
        "Total Cost of Production and Marketing",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
      cellStyle={{ textAlign: "left" }}
      style={{ fontWeight: "bold" }}
    />
    <CellRow
      values={[
        "Price per Kg (Rs)",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
      cellStyle={{ textAlign: "left" }}
      style={{ fontWeight: "bold" }}
    />
    <CellRow
      values={[
        "A Quality Price Per Kg (Rs)",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
    <CellRow
      values={[
        "B Quality Price Per Kg (Rs)",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
    <CellRow
      values={[
        "Mix (C) Price Per Kg (Rs)",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
    <CellRow
      values={[
        "Seed (D) Price Per Kg (Rs)",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
    <CellRow
      cellStyle={{ textAlign: "left" }}
      style={{ fontWeight: "bold" }}
      values={[
        "Total revenue generated (Rs)",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
    <CellRow
      cellStyle={{ textAlign: "left" }}
      style={{ fontWeight: "bold" }}
      values={[
        "Gross Profit (Rs)",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
  </div>
);

export default AllCosts;
