import type { FC } from "react";
import React from "react";
import CellRow from "~/components/cell-row";

export interface SeedProps {}

const Seed: FC<SeedProps> = () => (
  <div className="Seed">
    <CellRow
      values={[
        "Seed",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
  </div>
);

export default Seed;
