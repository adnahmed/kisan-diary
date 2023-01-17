import { boldText, nonEditable, textCell } from "~/components/spreadsheet/CellTypes";
import type ActivityWithTotalCost from "~/types/ActivityWithTotalCost";

const ActivitiyWithCostRows = (activities: ActivityWithTotalCost[]) => {
    return activities.map((activity) => ({
        rowId: activity.id,
        height: 100,
        cells: [
            nonEditable(boldText(textCell(activity.name), activity.isOperation)),
            {
                type: "number" as "number",
                value: activity.quanity || 0,
            },
            {
                type: "number" as "number",
                value: activity.unitCost || 0,
            },
            {
                type: "number" as "number",
                value: activity.totalCost || 0,
            },
        ],
    }));
};

export default ActivitiyWithCostRows;