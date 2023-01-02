import { Heading, useDisclosure } from "@chakra-ui/react";
import { Outlet, useCatch, useMatches } from "@remix-run/react";
import type { LinksFunction, LoaderArgs } from "@remix-run/server-runtime";
import type { FC } from "react";
import { useRef } from "react";
import { getUser } from "~/session.server";
import styles from "~/styles/routes/expert.css";
export const links: LinksFunction = () => [{ href: styles, rel: "stylesheet" }];

interface ExpertDashboardProps {}

export async function loader({ request }: LoaderArgs) {
  return {
    user: await getUser(request),
  };
}
//  - Administrator adds recommended crops based on Land Description and Season.
const ExpertDashboard: FC<ExpertDashboardProps> = () => {
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();

  const matches = useMatches();
  const lastMatch = matches.slice(-1)[0];
  const title = lastMatch && lastMatch.handle && lastMatch.handle.title;
  const btnRef = useRef(null);
  return (
    <div className="home">
      <div className="heading flex items-center p-4">
        <Heading className="flex justify-around grow" size="lg">
          {title || <span>Expert Dashboard</span>}
        </Heading>
      </div>
      <Outlet />
    </div>
  );
};
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
export default ExpertDashboard;
