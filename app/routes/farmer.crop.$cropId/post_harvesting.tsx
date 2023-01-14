import React, { FC } from "react";
import CellRow from "~/components/cell-row";
export const handle = {
  menu__item: "/farmer/crops",
};
export interface PostHarvestingProps {}

const PostHarvesting: FC<PostHarvestingProps> = () => (
  <div className="PostHarvesting">
    <CellRow
      cellStyle={{ textAlign: "left" }}
      style={{ fontWeight: "bold" }}
      values={["Post Harvesting"]}
    />
    <CellRow
      values={[
        "Cost of bags (empty bag)",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
    <CellRow
      values={[
        "Number of Bags (110kg)",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
    <CellRow
      values={[
        "Cost per bag (Rs)",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
    <CellRow
      values={[
        "Storage Cost",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
    <CellRow
      values={[
        "Number of bags",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
    <CellRow
      values={[
        "Storage Cost per bag (Rs)",
        <CellRow values={["", ""]} />,
        <CellRow values={["", ""]} />,
      ]}
    />
  </div>
);

export default PostHarvesting;
