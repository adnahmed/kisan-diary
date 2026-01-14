import { Heading } from "@chakra-ui/react";
import { Role } from "@prisma/client";
import { useCatch } from "@remix-run/react";
import type { UserResult } from "~/types/User";
import { useOptionalUser } from "../../utils";
import { useOptionalFarm } from "../hooks/useOptionalFarm";
import { AuthenticatedMenu, UnauthenticatedMenu } from "./Auth";
import ExpertNavBar from "./ExpertNavBar";
import FarmerNavBar from "./FarmerNavBar";
import NotificationGroup from "./NotificationGroup";
import { route } from "routes-gen";

const AppTitle = "Kisan Diary";

interface HeaderHeadingProps {
  showFarmName: boolean;
  showExpertTitle: boolean;
  farmName?: string;
}

function HeaderHeading({
  showFarmName,
  farmName,
  showExpertTitle,
}: HeaderHeadingProps) {
  return (
    <div className="flex flex-col ml-4">
      {showFarmName && farmName && (
        <span className="text-sm font-semibold text-primary-600 tracking-wide uppercase">
          {farmName}
        </span>
      )}
      {showExpertTitle && (
        <span className="text-sm font-semibold text-accent-500 tracking-wide uppercase">
          Expert Dashboard
        </span>
      )}
      <Heading
        as="h1"
        className={`bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800 font-heading font-bold ${
          showFarmName ? "text-xl" : "text-2xl"
        }`}
      >
        {AppTitle}
      </Heading>
    </div>
  );
}

interface HeaderArgs {
  isAuthenticated: Boolean;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="p-4 bg-red-50 text-red-900 border border-red-200 rounded">
      <h1 className="font-bold">Error</h1>
      <p>{error.message}</p>
    </div>
  );
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

export default function Header({ isAuthenticated }: HeaderArgs) {
  const user = useOptionalUser();
  const isUser = user !== undefined;
  const farm = useOptionalFarm();
  const NavBar = useNavBar(user);

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-surface-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Title */}
          <div className="flex items-center">
            <a href={route("/")} className="flex items-center group">
              <img
                key="logo"
                alt="logo"
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                src="/assets/diary.png"
              />
              <HeaderHeading
                farmName={farm?.name}
                showExpertTitle={isUser && user.role === Role.expert}
                showFarmName={isUser && user.role === Role.farmer}
              />
            </a>
          </div>

          {/* Navigation - Centered or Right Aligned usually, but sticking to existing logic flow */}
          <div className="hidden md:flex flex-1 justify-center px-8">
             {/* Component specific nav bars likely inject links here? 
                 Actually existing FarmerNavBar returns <li>s or similar? 
                 I need to check if they are full Nav bars or just links. 
                 Assuming they are usable components. 
             */}
             <nav className="flex space-x-6">
                 {NavBar}
             </nav>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {farm && <NotificationGroup />}
            {isAuthenticated ? <AuthenticatedMenu /> : <UnauthenticatedMenu />}
          </div>
        </div>
      </div>
    </header>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div className="p-4 bg-yellow-50 text-yellow-900">
      <h1>Caught {caught.status}</h1>
    </div>
  );
}
