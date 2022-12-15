import { FC } from "react";
import "./YearSelect.scss";
import { Link } from "react-router-dom";
import { GlowyButton } from "./GlowyButton";
export interface YearSelectProps {}
const years = [
  { start: "2021", end: "2022" },
  { start: "2020", end: "2021" },
  { start: "2019", end: "2020" },
  { start: "2018", end: "2019" },
];
const YearSelect: FC<YearSelectProps> = () => (
  <div className="YearSelect">
    <b style={{ fontSize: "xx-large", color: "green" }}>Cropping Year</b>
    <div>
      {years.map((year) => {
        return (
          <GlowyButton style={{ margin: "8px 8px" }}>
            <Link to={`year/${year.start}/${year.end}`}>
              {" "}
              {year.start} - {year.end}{" "}
            </Link>
          </GlowyButton>
        );
      })}
    </div>
  </div>
);

export default YearSelect;
