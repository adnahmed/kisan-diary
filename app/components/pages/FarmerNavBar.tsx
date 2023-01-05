import { route } from "routes-gen";
import NavBar from "../NavBar";

const menu = [
  "Home",
  "Farm Information",
  "Crops",
  "Manuals",
  "Photo Gallery",
  "Relevant Links",
  "Messages",
];
export default function FarmerNavBar() {
  return <NavBar dashboardPath={route("/farmer")} menu={menu} />;
}
