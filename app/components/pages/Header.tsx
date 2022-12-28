import { useMatches } from "@remix-run/react";
import FarmerNavBar from "./FarmerNavBar";

export default function Header(props) {
  const matches = useMatches();
  const lastMatch = matches.slice(-1)[0];
  const showFarmerNavbar = /farmer.*/.test(lastMatch.pathname);
  const showAdminNavbar = /admin.*/.test(lastMatch.pathname);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="header">
        <img key="logo" alt="logo" src="/assets/diary.png" className="logo" />
        <a key="title" href="/" className="title">
          Kesan Diary
        </a>
        <AuthMenu
          key="authMenu"
          isLoggedIn={props.isLoggedIn}
          onOpenLogIn={props.onOpenLogIn}
        />
      </div>
      {showFarmerNavbar && <FarmerNavBar />}
    </div>
  );
}
