import React from "react";
import CellRow from "~/components/CellRow";
export interface LandPreparationProps {}
export default function LandPreparation(props: LandPreparationProps) {
  return (
    <>
      <CellRow
        cellStyle={{ textAlign: "left" }}
        style={{ fontWeight: "bold" }}
        values={["Land Preparation"]}
      />
      <CellRow
        values={[
          "Land preparation (disk plough, cultivator, suhaga, chesil, rotavator)",
          <CellRow values={["", ""]} />,
          <CellRow values={["", ""]} />,
        ]}
      />
      <CellRow
        values={[
          "Planter",
          <CellRow values={["", ""]} />,
          <CellRow values={["", ""]} />,
        ]}
      />
      <CellRow
        style={{ fontWeight: "bold" }}
        values={[
          "Gross Land Preparation Cost",
          <CellRow values={["", ""]} />,
          <CellRow values={["", ""]} />,
        ]}
      />
    </>
  );
}
