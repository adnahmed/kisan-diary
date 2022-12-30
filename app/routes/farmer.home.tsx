import type { LinksFunction } from "@remix-run/server-runtime";
import styles from "~/styles/routes/farmer.css";
export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "preload", href: "/assets/kisan_day.jpeg", as: "image" },
  ];
};
export default function Farmer() {
  return <div className="home">Home</div>;
}
