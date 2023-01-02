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
const AppTitle = "Kisan Diary";
interface HeaderHeadingProps {
  showFarmName: boolean;
  farmName?: string;
}
function HeaderHeading({ showFarmName, farmName }: HeaderHeadingProps) {
  return (
    <div className="header__home home__heading">
      {showFarmName && (
        <Heading
          className="header__home home__heading heading__farm"
          fontSize={`3xl`}
        >
          {farmName}
        </Heading>
      )}
      <Heading
        className="header__home home__heading heading_app"
        fontSize={showFarmName ? `xs` : `4xl`}
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
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
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
  const farm = useOptionalFarm();
  const NavBar = useNavBar(user);
  return (
    <header>
      <a href="/" className="header__home">
        <img
          key="logo"
          alt="logo"
          className="header__home home__logo"
          src="/assets/diary.png"
        />
        <HeaderHeading
          farmName={farm?.name}
          showFarmName={user !== undefined && user.role === "farmer"}
        />
      </a>
      {isAuthenticated ? <AuthenticatedMenu /> : <UnauthenticatedMenu />}
      {farm && <NotificationGroup />}
      {NavBar}
    </header>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}
