import type { ReactNode } from "react";
import type { UserResult } from "../../types/User";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  user?: UserResult;
  children: ReactNode;
}

export default function Layout({ user, children }: LayoutProps) {
  return (
    <div className="layout">
      <Header isAuthenticated={!!user} />
      <div className="layout__children">{children}</div>
      <Footer />
    </div>
  );
}
