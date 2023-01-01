import { Role } from "@prisma/client";
import type { ReactNode } from "react";
import type { UserResult } from "../../types/User";
import ExpertNavBar from "./ExpertNavBar";
import FarmerNavBar from "./FarmerNavBar";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  user?: UserResult;
  children: ReactNode;
}

function useNavBar(user?: UserResult) {
  if (!user) return <></>;
  switch (user.role) {
    case Role.farmer:
      return <FarmerNavBar />;
    case Role.expert:
      return <ExpertNavBar />;
  }
}

export default function Layout({ user, children }: LayoutProps) {
  const NavBar = useNavBar(user);
  return (
    <div className="layout">
      <Header isAuthenticated={!!user} />
      {NavBar}
      <div className="layout__children">{children}</div>
      <Footer />
    </div>
  );
}
