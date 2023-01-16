import type {
  CellStyle,
  DefaultCellTypes,
  HeaderCell,
  NumberCell,
  TextCell,
} from "@silevis/reactgrid";
export const ROW_HEIGHT = 42;
export const COL_WIDTH = 253;

export const nonEditable = (cell: DefaultCellTypes): DefaultCellTypes => ({
  ...cell,
  nonEditable: true,
});
export const boldText = (cell: TextCell): DefaultCellTypes => ({
  ...cell,
  renderer: (text) => <b>{text}</b>,
});

export const HeadingCell: (text: string) => HeaderCell = (text) => ({
  type: "header",
  text: text,
  nonEditable: true,
  colspan: 4,
});

const numberFormat = new Intl.NumberFormat("de", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const numberCell = (
  value: number,
  className = "",
  style?: CellStyle
): NumberCell => ({
  type: "number",
  value,
  className,
  style,
  format: numberFormat,
});

export const showZero = (cell: NumberCell): NumberCell => ({
  ...cell,
  nanToZero: true,
  hideZero: false,
});

export const bottomLine = (cell: DefaultCellTypes): DefaultCellTypes => ({
  ...cell,
  style: {
    ...cell.style,
    border: {
      ...cell.style?.border,
      bottom: {
        width: "1px",
        color: "#A6A6A6",
        style: "solid",
      },
    },
  },
});

export const noSideBorders = (cell: DefaultCellTypes): DefaultCellTypes => ({
  ...cell,
  style: {
    ...cell.style,
    border: {
      ...cell.style?.border,
      left: {
        style: "none",
      },
      right: {
        style: "none",
      },
    },
  },
});

export const textCell = (
  text: string,
  className = "",
  style?: CellStyle
): TextCell => ({ type: "text", text, className, style });

export function monthHeaderCell(
  month: string,
  additionalClassNames = ""
): DefaultCellTypes {
  return nonEditable(
    textCell(month, `text-lg font-bold ${additionalClassNames}`, {
      background: "#107C41",
      color: "white",
      border: {
        bottom: { style: "none" },
        left: { style: "none" },
        right: { style: "none" },
      },
    })
  );
}

export const emptyTextCell: TextCell = { type: "text", text: "" };
export const emptyNumberCell: NumberCell = { type: "number", value: 0 };
export const HeaderRow = (text: string) => ({
  rowId: "header",
  height: ROW_HEIGHT,
  cells: [nonEditable(HeadingCell(text))],
});
