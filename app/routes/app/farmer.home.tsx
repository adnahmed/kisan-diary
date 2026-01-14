import type { LinksFunction } from "@remix-run/server-runtime";

export const links: LinksFunction = () => {
  return [
    { rel: "preload", href: "/assets/kisan_day.jpeg", as: "image" },
  ];
};
export default function Farmer() {
  return <div className="home">Home</div>;
}
