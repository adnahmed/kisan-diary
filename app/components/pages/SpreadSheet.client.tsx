import { useFetcher } from "@remix-run/react";
import { isError } from "lodash/fp";
import { useAsync, useAsyncCallback } from "react-async-hook";
import Spreadsheet from "x-data-spreadsheet";
import * as XLSX from "xlsx";
import { stox, xtos } from "~/helpers/xlsxspread";
import { DEFAULT_TEMPLATE_TYPE } from "../../helpers/FDSheet";

async function StreamToBlob(body) {
  const reader = body.getReader();
  const ConsumeStream = new ReadableStream({
    async start(controller) {
      while (true) {
        const { done, value } = await reader.read();

        // When no more data needs to be consumed, break the reading
        if (done) {
          break;
        }

        // Enqueue the next data chunk into our target stream
        controller.enqueue(value);
      }
      // Close the stream
      controller.close();
      reader.releaseLock();
    },
  });
  return await new Response(ConsumeStream).blob();
}
export interface LandPreparationProps {}
export async function fetchSpreadSheet(
  url: string,
  target: string | HTMLElement
) {
  try {
    const response = await fetch(url);
    if (!response.body) throw new Error("Error occurred fetching document");
    const blob = await StreamToBlob(response.body);
    const xlsx = await blob.text();
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
    s.loadData(stox(JSON.parse(xlsx)));
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
  const searchParams = new URLSearchParams(file.split("?")[1]);
  const filename = searchParams.get("fdata");
  const saveFile = useAsyncCallback(async () => {
    if (
      spreadsheet.loading ||
      spreadsheet.error ||
      !spreadsheet.result ||
      !filename
    )
      return;
    try {
      const xdata = spreadsheet.result.getData();
      const wb = xtos(xdata);
      const wbout = XLSX.write(wb, { type: "array" });

      /* build FormData with the generated file */
      var fdata = new FormData();
      fdata.append("file", new File([wbout], filename + DEFAULT_TEMPLATE_TYPE));
      spreadsheet_fetcher.submit(fdata, {
        action: "/api/save_document",
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
