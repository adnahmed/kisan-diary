import { useCatch } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/server-runtime";
import type { CellChange, Row } from "@silevis/reactgrid";
import { ReactGrid } from "@silevis/reactgrid";
import { HeaderRow, emptyNumberCell } from "~/components/spreadsheet/CellTypes";
import { OperationRow } from "~/components/spreadsheet/OperationRow";
import { Columns } from "~/components/spreadsheet/TitleColumn";
import styles from "~/styles/routes/farmer.crop.land_preparation.css";
import type { LoaderArgs } from "@remix-run/node";
import { prisma } from "~/db.server";
import { ActivityType } from "@prisma/client";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
export const handle = {
  menu__item: "/farmer/crops",
};
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};
export async function loader({ request }: LoaderArgs) {
  return typedjson({
    activity: await prisma.activity.findMany({
      where: {
        type: ActivityType.landPreparation,
      },
    }),
  });
}
export interface LandPreparationProps {}

export default function LandPreparation(props: LandPreparationProps) {
  const data = useTypedLoaderData<typeof loader>();

  const Rows: Row[] = [
    OperationRow,
    HeaderRow("Land Preparation"),
    {
      rowId: "1",
      height: 100,
      cells: [
        {
          type: "text",
          text: "Land preparation (disk plough, cultivator, suhaga, chesil, rotavator)",
          nonEditable: true,
        },
        emptyNumberCell,
        emptyNumberCell,
        emptyNumberCell,
      ],
    },
    {
      rowId: "2",
      height: 50,
      cells: [
        {
          type: "text",
          text: "Planter",
          nonEditable: true,
        },
        emptyNumberCell,
        emptyNumberCell,
        emptyNumberCell,
      ],
    },
    {
      rowId: "3",
      height: 50,
      cells: [
        {
          type: "text",
          text: "Gross Land Preparation Cost",
          nonEditable: true,
          renderer: (text) => <div style={{ fontWeight: "bold" }}>{text}</div>,
        },
        emptyNumberCell,
        emptyNumberCell,
        emptyNumberCell,
      ],
    },
  ];
  const handleChanges = (changes: CellChange[]) => {
    changes.forEach((change: CellChange) => {
      if (change.type === "number") {
        if (change.rowId === "1") {
          console.log("newvalue:", change.newCell.value);
        }
      }
    });
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
