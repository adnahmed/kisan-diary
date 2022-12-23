import type { Role } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import type UserCreateInput from '../app/types/UserCreateInput';
import type FarmCreateInput from '../app/types/FarmCreateInput';

const prisma = new PrismaClient();

const admin: UserCreateInput = {
  email: "admin@kisan.diary",
  firstName: 'Adnan',
  lastName: 'Ahmed',
  role: 'admin' as Role,
  address: 'Wahdat Road Street No. 1, House No. 1',
  region: 'Sargodha'
}

const farmer: UserCreateInput = {
  email: "farmer@kisan.diary",
  firstName: 'Adnan',
  lastName: 'Ahmed',
  role: 'farmer' as Role,
  address: 'Wahdat Road Street No. 1, House No. 1',
  region: 'Sargodha'
}

const farm: FarmCreateInput = {
  name: 'Kauser Agriculture Farm',
  region: 'Sialkot',
  total_land: 20,
  land_type: 'Nehri',
  machinery: ['Tractor', 'Leveler'],
  irrigation_source: ['Canal']
}

async function seed() {
  // cleanup the existing database
  await prisma.user.deleteMany({ where: { email: { in: [admin.email, farmer.email] } } }).catch(() => {
    // no worries if it doesn't exist yet
  });
  await prisma.farm.delete({ where: { name: farm.name } }).catch(() => {
    // no worries if it doesn't exist yet
  });
  const hashedPassword = await bcrypt.hash("password", 10);
  const regionInput = (entity: { region: string }) => ({
    connectOrCreate: {
      create: { name: entity.region },
      where: { name: entity.region }
    }

  })
  const prismaUserData = (user: UserCreateInput) => ({
    ...user,
    region: regionInput(user),
    password: {
      create: {
        hash: hashedPassword,
      },
    },

  })
  const prismaFarmData = {
    ...farm,
    user: {
      connectOrCreate: {
        create: prismaUserData(farmer),
        where: { email: farmer.email }
      }
    },
    region: regionInput(farm)
  }

  await prisma.user.create({
    data: prismaUserData(admin)
  });

  await prisma.user.create({
    data: prismaUserData(farmer),
  });

  await prisma.farm.create({
    data: prismaFarmData
  })
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