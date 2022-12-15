import React, { FC } from "react";
import CellRow from "~/components/CellRow";

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
