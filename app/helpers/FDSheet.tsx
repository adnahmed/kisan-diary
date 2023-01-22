import fs from "fs";
import { isError } from "lodash/fp";
import createFileFromTemplate from "./createFileFromTemplate";
export const DEFAULT_TEMPLATE_TYPE = ".xlsx";
export const DEFAULT_TEMPLATE = `public/Financial Data${DEFAULT_TEMPLATE_TYPE}`;
export const SPREADSHEET_ROOT = "public/sheets/";
export const createNewSheet = (id: string) =>
  createFileFromTemplate(
    DEFAULT_TEMPLATE,
    SPREADSHEET_ROOT + id + DEFAULT_TEMPLATE_TYPE
  );
export const deleteSheet = (id: string) => {
  try {
    fs.rmSync(SPREADSHEET_ROOT + id + DEFAULT_TEMPLATE_TYPE);
  } catch (error) {
    if (isError(error)) console.log(error.message);
  }
};
