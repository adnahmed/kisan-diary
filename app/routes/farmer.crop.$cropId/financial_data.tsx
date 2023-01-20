import { unstable_parseMultipartFormData } from "@remix-run/node";
import { useCatch, useParams } from "@remix-run/react";
import type { ActionArgs, LinksFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { ClientOnly } from "remix-utils";
import SpreadSheet from "~/components/pages/SpreadSheet.client";
import uploadHandler from "~/helpers/uploadHandler";
import { getUser } from "~/session.server";
import styles from "~/styles/routes/farmer.crop.land_preparation.css";
export const handle = {
  menu__item: "/farmer/crops",
};
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};
export const SPREADSHEET_ROOT = "public/sheets/";
export async function action({ request }: ActionArgs) {
  try {
    const user = await getUser(request);
    if (!user) throw new Error("Unauthenticated");
    const form = await unstable_parseMultipartFormData(
      request,
      uploadHandler(true, SPREADSHEET_ROOT)
    );
    const file = form.get("file");
    return {
      path: file?.filepath,
    };
  } catch (err) {
    if (err instanceof Error) return json({ error: err.message });
    else return json({ error: err });
  }
}

export default function FinancialData() {
  const params = useParams();
  return (
    <div>
      <ClientOnly>
        {() => (
          <SpreadSheet
            file={`/api/fetch_document?cropId=${params.cropId}`}
            target=".spreadsheet__landPreparation"
          />
        )}
      </ClientOnly>
      <div className="spreadsheet__landPreparation"></div>
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
