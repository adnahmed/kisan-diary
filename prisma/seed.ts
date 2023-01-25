import type { Role } from "@prisma/client";
import { AlertType, IssueType, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { isError } from "lodash/fp";
import { nanoid } from "nanoid";
import { createNewSheet } from "~/helpers/FDSheet";
import type IssueCreateInput from "~/types/IssueCreateInput";
import type { UserCreateInput } from "~/types/User";
import { deleteSheet } from '../app/helpers/FDSheet';
import type CropCreateInput from "../app/types/CropCreateInput";
import type FarmCreateInput from "../app/types/FarmCreateInput";
import CropsSeed from "./crops.seed";
import RegionsSeed from "./regions.seed";


const crops: CropCreateInput[] = CropsSeed.map((crop_seed) => ({
  name: crop_seed,
}));

const prisma = new PrismaClient();
const alert = {};
const expert: UserCreateInput = {
  email: "admin@kisan.diary",
  firstName: "Adnan",
  lastName: "Ahmed",
  role: "expert" as Role,
  address: "Wahdat Road Street No. 1, House No. 1",
  region: "Sargodha",
};

const farmer: UserCreateInput = {
  email: "farmer@kisan.diary",
  firstName: "Adnan",
  lastName: "Ahmed",
  role: "farmer" as Role,
  address: "Wahdat Road Street No. 1, House No. 1",
  region: "Sargodha",
};

const farm: FarmCreateInput = {
  name: "Kauser Agriculture Farm",
  total_land: 20,
  soil_type: "Sandy",
  region: "Sargodha",
  machinery: ["Tractor", "Leveler"],
  irrigation_source: ["Canal"],
};

const issue: IssueCreateInput = {
  content:
    "Hello Experts, I am looking at a bug namely `Akintas Papari`. Please provide protective measure for my wheat crop against this bug. Thanks",
  type: IssueType.disease_management,
};

async function seed() {
  // cleanup the existing database
  async function catchWithError(call: () => void) {
    try {
      await call()
    } catch (err) {
      if (isError(err))
        console.error(err.message)
    }
  }
  await catchWithError(async () => await prisma.issue.deleteMany())
  await catchWithError(async () => await prisma.readReciept.deleteMany())
  await catchWithError(async () => await prisma.user.deleteMany())
  await catchWithError(async () => await prisma.farm.deleteMany())
  // cleanup financial sheets
  const sheets = await prisma.financialData.findMany();
  for (const sheet of sheets) deleteSheet(sheet.path)
  await catchWithError(async () => await prisma.financialData.deleteMany())
  await catchWithError(async () => await prisma.crop.deleteMany())
  await catchWithError(async () => await prisma.alert.deleteMany())
  await catchWithError(async () => await prisma.region.deleteMany())

  await prisma.region.createMany({
    data: RegionsSeed.map((region_seed) => ({ name: region_seed })),
  });
  const hashedPassword = await bcrypt.hash("password", 10);

  const regionInput = (entity: { region: string }) => ({
    connectOrCreate: {
      create: { name: entity.region },
      where: { name: entity.region },
    },
  });

  const prismaUserData = (user: UserCreateInput) => ({
    ...user,
    region: regionInput(user),
    password: {
      create: {
        hash: hashedPassword,
      },
    },
  });

  const prismaFarmData = {
    ...farm,
    user: {
      connectOrCreate: {
        create: prismaUserData(farmer),
        where: { email: farmer.email },
      },
    },
    region: regionInput(farm),
  };

  await prisma.user.create({
    data: prismaUserData(expert),
  });

  const createdFarmer = await prisma.user.create({
    data: {
      ...prismaUserData(farmer),
    },
  });

  const createdFarm = await prisma.farm.create({
    data: {
      ...prismaFarmData,
    },
  });

  await prisma.crop.createMany({
    data: crops,
  });

  await prisma.farm.update({
    where: {
      name: farm.name,
    },
    data: {
    },
  });
  const sheetIds = [nanoid(), nanoid()]
  for (let i = 0; i < 2; i++) {
    createNewSheet(sheetIds[i])
    await prisma.financialData.create({
      data: {
        path: sheetIds[i],
        year_start: 2021,
        year_end: 2022,
        farm: {
          connect: {
            name: farm.name
          }
        },
        crop: {
          connect: {
            name: crops[i].name
          },
        },
      }
    })
  }
  // Connect Alert to Potato
  await prisma.alert.create({
    data: {
      ...alert,
      alertType: AlertType.alert,
      details: "",
      affectedCrops: {
        connect: {
          name: crops[0].name,
        },
      },
      affectedRegions: {
        connect: {
          name: farmer.region,
        },
      },
    },
  });

  // farmer reads the alert
  await prisma.readReciept.create({
    data: {
      readBy: {
        connect: {
          email: farmer.email,
        },
      },
      alert: {
        connect: {
          details: "",
        },
      },
    },
  });

  await prisma.issue.create({
    data: {
      type: issue.type,
      content: issue.content,
      postedBy: {
        connect: {
          id: createdFarmer.id,
        },
      },
      belongs_to: {
        connect: {
          id: createdFarm.id,
        },
      },
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
