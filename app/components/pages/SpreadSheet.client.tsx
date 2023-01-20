import { useFetcher } from "@remix-run/react";
import { isError } from "lodash/fp";
import { useAsync, useAsyncCallback } from "react-async-hook";
import Spreadsheet from "x-data-spreadsheet";
import * as XLSX from "xlsx";
import { stox, xtos } from "~/helpers/xlsxspread";
export interface LandPreparationProps {}
export async function fetchSpreadSheet(
  url: string,
  target: string | HTMLElement
) {
  try {
    const file = await fetch(url);
    const ab = await file.arrayBuffer();
    const xlsx = XLSX.read(ab);
    const ROWS = 20;
    const ROW_HEIGHT = 25;
    const COLUMNS = 12;
    const COLUMN_WIDTH = 100;
    const s = new Spreadsheet(target, {
      mode: "edit", // edit | read
      showToolbar: true,
      showGrid: true,
      showContextmenu: true,
      view: {
        height: () => ROWS * ROW_HEIGHT,
        width: () => COLUMNS * COLUMN_WIDTH,
      },
      row: {
        len: ROWS,
        height: ROW_HEIGHT,
      },
      col: {
        len: COLUMNS,
        width: COLUMN_WIDTH,
        indexWidth: 60,
        minWidth: 10,
      },
      style: {
        bgcolor: "#ffffff",
        align: "left",
        valign: "middle",
        textwrap: true,
        strike: false,
        underline: false,
        color: "#0a0a0a",
        font: {
          name: "Helvetica",
          size: 10,
          bold: false,
          italic: false,
        },
      },
    });
    s.loadData(stox(xlsx));
    return s;
  } catch (err) {
    if (isError(err)) console.log(err.message);
    return undefined;
  }
}
interface SpreadSheetProps {
  target: string | HTMLElement;
  file: string;
}
const AppButton = ({ onClick, children }) => {
  const asyncOnClick = useAsyncCallback(onClick);
  return (
    <button onClick={asyncOnClick.execute} disabled={asyncOnClick.loading}>
      {asyncOnClick.loading ? "..." : children}
    </button>
  );
};
export default function SpreadSheet({ target, file }: SpreadSheetProps) {
  const spreadsheet = useAsync(fetchSpreadSheet, [file, target]);
  const spreadsheet_fetcher = useFetcher();
  const saveFile = useAsyncCallback(async () => {
    if (spreadsheet.loading || spreadsheet.error || !spreadsheet.result) return;
    try {
      const xdata = spreadsheet.result.getData();
      const wb = xtos(xdata);
      const wbout = XLSX.write(wb, { type: "array" });
      /* prepare data for POST */
      var blob = new Blob([new Uint8Array(wbout)], {
        type: "application/octet-stream",
      });

      /* build FormData with the generated file */
      var fdata = new FormData();
      fdata.append("file", blob, file);
      spreadsheet_fetcher.submit(fdata, {
        method: "post",
        encType: "multipart/form-data",
      });
    } catch (err) {
      if (isError(err)) console.log(err);
    }
  });

  return (
    <div>
      {JSON.stringify(spreadsheet_fetcher.data)}
      <button onClick={() => saveFile.execute()}>Save</button>
    </div>
  );
}

// {/* {transition.state === "submitting" ? <p>Saving...</p> : null} */}
//       {/* <ReactGrid
//         rows={Rows}
//         columns={Columns}
//         onCellsChanged={handleChanges}
//         stickyTopRows={1}
//         enableFillHandle
//         enableRangeSelection
//       /> */}
