import { Heading } from "@chakra-ui/react";
import { useCatch } from "@remix-run/react";
import { useOptionalUser } from "../../utils";
import { useOptionalFarm } from "../hooks/useOptionalFarm";
import { AuthenticatedMenu, UnauthenticatedMenu } from "./Auth";
import NotificationGroup from "./NotificationGroup";
const AppTitle = "Kisan Diary";
interface HeaderHeadingProps {
  showFarmName: boolean;
  farmName?: string;
}
function HeaderHeading({ showFarmName, farmName }: HeaderHeadingProps) {
  return (
    <>
      {showFarmName && <Heading fontSize={`3xl`}>{farmName}</Heading>}
      <Heading fontSize={showFarmName ? `xs` : `4xl`}>{AppTitle}</Heading>
    </>
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
export default function Header({ isAuthenticated }: HeaderArgs) {
  const user = useOptionalUser();
  const farm = useOptionalFarm();

  return (
    <header>
      <a href="/" className="flex grow">
        <img key="logo" alt="logo" className="logo" src="/assets/diary.png" />
        <div className="self-center w-full text-center">
          <HeaderHeading
            farmName={farm?.name}
            showFarmName={user !== undefined && user.role === "farmer"}
          />
        </div>
      </a>
      <div className="layout__menu">
        {isAuthenticated ? <AuthenticatedMenu /> : <UnauthenticatedMenu />}
        {farm && <NotificationGroup />}
      </div>
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
