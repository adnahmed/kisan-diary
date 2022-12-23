import { Link } from "@remix-run/react";

export default function CropCard() {
  return (
    <div className="crop-card">
      <div style={{ color: "green" }} className="heading">
        Farm Functions
      </div>
      <div className="crop-card options">
        <Link to="land-preparation">Land Preparation</Link>
        <Link to="sowing">Sowing</Link>
        <Link to="inputs">Inputs</Link>
        <Link to="harvesting">Harvesting</Link>
        <Link to="post-harvesting-and-storage">Post Harvest And Storage</Link>
        <Link to="marketing">Marketing</Link>
        <Link to="all-costs">All Costs</Link>
        <Link to="economic-analysis">Economic Analysis</Link>
      </div>
    </div>
  );
}
