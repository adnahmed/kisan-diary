import NavBar from "../NavBar";
const menu = ["🔊 Manage Alerts/Recommendations", "Manuals", "Messages"];
export default function ExpertNavBar() {
  return <NavBar menu={menu} dashboardPath={"/expert/"} />;
}
