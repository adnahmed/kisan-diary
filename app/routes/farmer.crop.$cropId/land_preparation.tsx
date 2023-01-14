import CellRow from "~/components/cell-row";

import type { Column, Row } from "@silevis/reactgrid";
import React from "react";
export const handle = {
  menu__item: "/farmer/crops",
};
export interface LandPreparationProps {}

interface Person {
  name: string;
  surname: string;
}

const getPeople = (): Person[] => [
  { name: "Thomas", surname: "Goldman" },
  { name: "Susie", surname: "Quattro" },
  { name: "", surname: "" },
];

const getColumns = (): Column[] => [
  { columnId: "land_preparation" },
  { columnId: "land_preparation_des" },
];

const headerRow: Row = {
  rowId: "header",
  cells: [
    { type: "header", text: "Name" },
    { type: "header", text: "Surname" },
  ],
};
const getRows = (people: Person[]): Row[] => [
  headerRow,
  ...people.map<Row>((person, idx) => ({
    rowId: idx,
    cells: [
      { type: "text", text: person.name },
      { type: "text", text: person.surname },
    ],
  })),
];

export default function LandPreparation(props: LandPreparationProps) {
  const [people] = React.useState<Person[]>(getPeople());

  const rows = getRows(people);
  const columns = getColumns();
  return (
    <>
      {/* <ReactGrid rows={rows} columns={columns} /> */}
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
