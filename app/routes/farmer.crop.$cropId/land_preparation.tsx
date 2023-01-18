import { ActivityType } from "@prisma/client";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { useCatch, useFetcher, useTransition } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/server-runtime";
import type { CellChange, NumberCell, Row } from "@silevis/reactgrid";
import { ReactGrid } from "@silevis/reactgrid";
import { useEffect } from "react";
import {
  typedjson,
  useTypedActionData,
  useTypedLoaderData,
} from "remix-typedjson";
import { HeaderRow } from "~/components/spreadsheet/CellTypes";
import { OperationRow } from "~/components/spreadsheet/OperationRow";
import { Columns } from "~/components/spreadsheet/TitleColumn";
import { prisma } from "~/db.server";
import ActivitiyWithCostRows from "~/helpers/activity";
import styles from "~/styles/routes/farmer.crop.land_preparation.css";
import { boldText, textCell } from "../../components/spreadsheet/CellTypes";

export const handle = {
  menu__item: "/farmer/crops",
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const id = formData.get("id")?.toString();
  const key = formData.get("key")?.toString();
  const value = formData.get("value")?.toString();
  const num = Number(value);
  if (!id || !key || !value) return null;
  const updateQuery = {
    where: {
      id: id,
    },
    data: {
      [key]: num,
    },
  };
  await prisma.activity.update({
    ...updateQuery,
  });
  return typedjson(updateQuery);
}
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
  const data = useTypedActionData<typeof action>();
  const Rows: Row[] = [
    OperationRow,
    HeaderRow("Land Preparation"),
    ...ActivitiyWithCostRows(activities),
    {
      rowId: "gross",
      cells: [boldText(textCell("Gross Land Preparation Cost"))],
    },
  ];
  const fetcher = useFetcher();
  useEffect(() => console.log(`Action: ${JSON.stringify(fetcher.data)}`));
  const transition = useTransition();
  const handleChanges = (changes: CellChange[]) => {
    changes.forEach((change: CellChange<NumberCell>) => {
      const formData = new FormData();
      formData.set("id", change.rowId.toString());
      formData.set("key", change.columnId.toString());
      formData.set("value", change.newCell.value.toString());
      fetcher.submit(formData, { method: "post" });
    });
  };

  return (
    <div className="crop__content content__landPreparation">
      {transition.state === "submitting" ? <p>Saving...</p> : null}
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
