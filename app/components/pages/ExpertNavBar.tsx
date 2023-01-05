import { route } from "routes-gen";
import NavBar from "../NavBar";
const menu = ["🔊 Manage Alerts/Recommendations", "Manuals", "Messages"];
export default function ExpertNavBar() {
  return <NavBar menu={menu} dashboardPath={route("/expert")} />;
}
