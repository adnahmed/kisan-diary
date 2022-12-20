import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import Region from '../app/models/Data/Region';

const prisma = new PrismaClient();
const admin = {
  email: "admin@kisan.diary",
  firstName: 'Adnan',
  lastName: 'Ahmed',
  role: 'admin' as Role,
  address: 'Wahdat Road Street No. 1, House No. 1',
  region: 'Sargodha'
}
const farmer = {
  email: "farmer@kisan.diary",
  firstName: 'Adnan',
  lastName: 'Ahmed',
  role: 'farmer' as Role,
  address: 'Wahdat Road Street No. 1, House No. 1',
  region: 'Sargodha'
}
async function seed() {
  // cleanup the existing database
  await prisma.user.deleteMany({ where: { email: { in: [admin.email, farmer.email] } } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("password", 10);
  await prisma.user.create({
    data: {
      ...admin,
      region: {
        connectOrCreate: {
          create: { name: admin.region },
          where: { name: admin.region }
        }
      },
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
    include: {
      region: true
    }
  });
  await prisma.user.create({
    data: {
      ...farmer,
      region: {
        connectOrCreate: {
          create: { name: farmer.region },
          where: { name: farmer.region }
        }
      },
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
    include: {
      region: true
    }
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
