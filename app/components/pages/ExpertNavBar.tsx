import NavBar from "../NavBar";

const menu = [
  "🔊 Manage Alerts/Recommendations",
  "Manuals",
  "Messages",
  "Farmer Issues",
];

export default function ExpertNavBar() {
  return <NavBar menu={menu} dashboardPath={"/expert/"} />;
}
