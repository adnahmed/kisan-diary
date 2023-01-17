import React, { FC } from "react";

export interface InformationProps {
  topic: string;
}

const Information: FC<InformationProps> = (props) => (
  <div className="Information">
    <b>Information on {props.topic}</b>
  </div>
);

export default Information;
