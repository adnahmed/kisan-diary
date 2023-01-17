import { ActivityType } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/node";
import { useCatch } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/server-runtime";
import type { CellChange, Row } from "@silevis/reactgrid";
import { ReactGrid } from "@silevis/reactgrid";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { HeaderRow } from "~/components/spreadsheet/CellTypes";
import { OperationRow } from "~/components/spreadsheet/OperationRow";
import { Columns } from "~/components/spreadsheet/TitleColumn";
import { prisma } from "~/db.server";
import ActivitiyWithCostRows from "~/helpers/activity";
import styles from "~/styles/routes/farmer.crop.land_preparation.css";
export const handle = {
  menu__item: "/farmer/crops",
};
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};
export async function loader({ request }: LoaderArgs) {
  return typedjson({
    activities: await prisma.activity.findMany({
      where: {
        type: ActivityType.landPreparation,
      },
    }),
  });
}
export interface LandPreparationProps {}

export default function LandPreparation(props: LandPreparationProps) {
  const { activities } = useTypedLoaderData<typeof loader>();
  const Rows: Row[] = [
    OperationRow,
    HeaderRow("Land Preparation"),
    ...ActivitiyWithCostRows(activities),
  ];

  const handleChanges = (changes: CellChange[]) => {
    changes.forEach((change: CellChange) => {});
  };

  return (
    <div className="crop__content content__landPreparation">
      <ReactGrid
        rows={Rows}
        columns={Columns}
        onCellsChanged={handleChanges}
        stickyTopRows={1}
        enableFillHandle
        enableRangeSelection
      />
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
