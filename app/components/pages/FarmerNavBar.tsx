import NavBar from "../NavBar";

const menu = [
  "Home",
  "Farm Information",
  "Crops",
  "Manuals",
  "Photo Gallery",
  "Relevant Links",
  "Messages",
  "Help",
];
export default function FarmerNavBar() {
  return <NavBar dashboardPath={"/farmer/"} menu={menu} />;
}
