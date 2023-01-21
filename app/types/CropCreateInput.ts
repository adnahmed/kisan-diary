import type { Crop } from "@prisma/client";
import type { SetOptional } from "type-fest";

type CropCreateInput = SetOptional<Omit<Crop, "id" | "farms" | "alerts">, "coveredLand" | "suitableSeasons" | "suitableSoilTypes">
export default CropCreateInput;
