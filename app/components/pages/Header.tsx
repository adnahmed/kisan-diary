import { Heading } from "@chakra-ui/react";
import { useCatch } from "@remix-run/react";
import { useOptionalUser } from "../../utils";
import { useOptionalFarm } from "../hooks/useOptionalFarm";
import { AuthenticatedMenu, UnauthenticatedMenu } from "./Auth";
const AppTitle = "Kisan Diary";

function HeaderHeading(props) {
  const user = useOptionalUser();
  const farm = useOptionalFarm();
  return (
    <>
      {user && farm && <Heading fontSize={`3xl`}>{farm.name}</Heading>}
      <Heading fontSize={user ? `xs` : `4xl`}>{AppTitle}</Heading>
    </>
  );
}

interface HeaderArgs {
  isAuthenticated: Boolean;
}

export default function Header({ isAuthenticated }: HeaderArgs) {
  return (
    <div
      className="flex 
    bg-no-repeat
    text-white
    sticky
    top-0
    bg-[#368729]"
    >
      <a href="/" className="flex grow">
        <img key="logo" alt="logo" className="logo" src="/assets/diary.png" />
        <div className="self-center w-full text-center">
          <HeaderHeading />
        </div>
      </a>
      {isAuthenticated ? <AuthenticatedMenu /> : <UnauthenticatedMenu />}
      {/* <NotificationGroup /> */}
    </div>
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
