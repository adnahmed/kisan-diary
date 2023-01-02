import { Link } from "@remix-run/react";
import { HiSpeakerWave } from "react-icons/hi2";
import CABIButton from "../cabi-button";

export default function ExpertNavBar() {
  return (
    <div className="navbar">
      <Link to="/expert/alerts">
        <CABIButton leftIcon={<HiSpeakerWave />}>
          Manage Alerts / Recommendations
        </CABIButton>
      </Link>
      <Link to="/expert/manuals">
        <CABIButton>Manuals</CABIButton>
      </Link>
    </div>
  );
}
