import type { ReactNode } from "react";
import type { UserResult } from "../../types/User";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  user?: UserResult;
  children: ReactNode;
}

export default function Layout({ user, children }: LayoutProps) {
  const isPublic = user === undefined && "public__layout";
  return (
    <div className={`layout ${isPublic}`}>
      <Header isAuthenticated={!!user} />
      <div className={`layout__children `}>{children}</div>
      <Footer />
    </div>
  );
}
