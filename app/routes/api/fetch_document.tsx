import type { LoaderArgs } from "@remix-run/server-runtime";
import { isError } from "lodash/fp";
import * as XLSX from "xlsx";
import { SPREADSHEET_ROOT } from "~/helpers/FDSheet";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const fdpath = url.searchParams.get("fdata");
  try {
    return XLSX.read(SPREADSHEET_ROOT + `${fdpath}.xlsx`, {
      type: "file",
    });
  } catch (error) {
    if (isError(error)) console.log(error.message);
    return {
      error,
    };
  }
}
