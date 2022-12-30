import type { User } from "@prisma/client";
import { Role } from "@prisma/client";
import type { ReactNode } from "react";
import ExpertNavBar from "./ExpertNavBar";
import FarmerNavBar from "./FarmerNavBar";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  user?: User;
  children: ReactNode;
}

function useNavBar(user?: User) {
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
      {children}
      <Footer />;
    </div>
  );
}
