import { ActivityType } from '@prisma/client';
import type ActivityCreateInput from '~/types/ActivityCreateInput';
const LandPreparationSeed: ActivityCreateInput[] = [
    {
        type: ActivityType.landPreparation,
        name: "Land preparation (disk plough, cultivator, suhaga, chesil, rotavator)",
        isOperation: false,
        quanity: 0,
        unitCost: 0,
    },
    {
        type: ActivityType.landPreparation,
        name: "Planter",
        isOperation: false,
        quanity: 0,
        unitCost: 0,
    },
    {
        type: ActivityType.landPreparation,
        name: "Gross Land Preparation Cost",
        isOperation: true,
        quanity: 0,
        unitCost: 0,
    },
]
export default LandPreparationSeed;
