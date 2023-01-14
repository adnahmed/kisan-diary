import type { FC } from "react";
import CellRow from "~/components/cell-row";
export const handle = {
  menu__item: "/farmer/crops",
};
export interface SowingProps {}

const Sowing: FC<SowingProps> = () => (
  <div className="Sowing">
    <CellRow
      cellStyle={{ textAlign: "left" }}
      style={{ fontWeight: "bold" }}
      values={["Sowing"]}
    />
  </div>
);

export default Sowing;
