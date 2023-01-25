import type { LoaderArgs } from "@remix-run/node";
import { useCatch } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/server-runtime";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { ClientOnly } from "remix-utils";
import type { RouteParams } from "routes-gen";
import SpreadSheet from "~/components/pages/SpreadSheet.client";
import { prisma } from "~/db.server";
import styles from "~/styles/routes/farmer.crop.land_preparation.css";
export const handle = {
  menu__item: "/farmer/crops",
};
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export async function loader({ request, params }: LoaderArgs) {
  const fdId =
    params.fdId as RouteParams["/farmer/crop/:cropId/financial_data/:fdId"];
  if (!fdId) throw new Error("No Spreadsheet Specified");
  const fd = await prisma.financialData.findUnique({
    where: {
      id: fdId,
    },
  });
  if (!fd) throw new Error("No Spreadsheet found");
  return typedjson({
    path: fd.path,
  });
}

export default function FinancialData() {
  const { path } = useTypedLoaderData<typeof loader>();
  return (
    <div>
      <ClientOnly>
        {() => (
          <SpreadSheet
            file={`/api/fetch_document?fdata=${path}`}
            target=".spreadsheet"
          />
        )}
      </ClientOnly>
      <div className="spreadsheet"></div>
    </div>
  );
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
