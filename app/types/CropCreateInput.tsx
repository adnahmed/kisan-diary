import type { Crop } from "@prisma/client";

type CropCreateInput = Omit<Crop, "id" | "farms" | "alerts">;
export default CropCreateInput;
