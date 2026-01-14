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
    <div className="flex flex-col min-h-screen bg-secondary-50 font-sans text-surface-900 transition-colors duration-300">
      <Header isAuthenticated={!!user} />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in relative z-0">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-50/50 via-transparent to-secondary-100/50 pointer-events-none" />
        {children}
      </main>
      <Footer />
    </div>
  );
}
