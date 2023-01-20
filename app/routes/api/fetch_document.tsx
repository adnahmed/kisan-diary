import type { LoaderArgs } from "@remix-run/server-runtime";
import * as XLSX from "xlsx";
import { SPREADSHEET_ROOT } from "../farmer.crop.$cropId/financial_data";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const cropId = url.searchParams.get("cropId");
  try {
    const workbook = XLSX.readFile(SPREADSHEET_ROOT + `${cropId}.xlsx`);
    return {
      workbook,
    };
  } catch (error) {
    return {
      error,
    };
  }
}
