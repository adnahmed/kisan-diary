import { Outlet, useLocation } from "@remix-run/react";
import type { FC } from "react";
import CellRow from "~/components/cell-row";
import IntegratedDiseaseManagement from "./inputs/integrated_disease_management";
import IntegratedPestManagement from "./inputs/integrated_pest_management";
import IntegratedWeedManagement from "./inputs/integrated_weed_management";
import Irrigation from "./inputs/irrigation";
import LaborManagement from "./inputs/labor_management";
import NutrientManagement from "./inputs/nutrient_management";
import Seed from "./inputs/seed";
export const handle = {
  menu__item: "/farmer/crops",
};
export interface InputsCropProps {}

const InputsCrop: FC<InputsCropProps> = () => {
  const last = useLocation().pathname.split("/").at(-1);
  return last && last === "inputs" ? (
    <>
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
    </>
  ) : (
    <Outlet />
  );
};

export default InputsCrop;
