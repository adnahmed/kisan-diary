import type { Role } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import type AlertCreateInput from "~/types/AlertCreateInput";
import type CropCreateInput from "~/types/CropCreateInput";
import type PostCreateInput from "~/types/PostCreateInput";
import type { UserCreateInput } from "~/types/User";
import type { CommentCreateWithoutReplyInput } from '../app/types/CommentCreateInput';
import type FarmCreateInput from '../app/types/FarmCreateInput';
import type PostTagCreateInput from '../app/types/PostTagCreateInput';

const prisma = new PrismaClient();

const expert: UserCreateInput = {
  email: "admin@kisan.diary",
  firstName: 'Adnan',
  lastName: 'Ahmed',
  role: 'expert' as Role,
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
const crops: CropCreateInput[] = [
  {
    name: 'Potato',
    picture: null,
    coveredLand: 10
  },
  {
    name: 'Maize',
    picture: null,
    coveredLand: 8
  }
]

const post: PostCreateInput = {
  title: 'An unseen bug in wheat crop. What should i do?',
  content: 'Hello Experts, I am looking at a bug namely `Akintas Papari`. Please provide protective measure for my wheat crop against this bug. Thanks'
}
const tags: PostTagCreateInput[] = [
  { name: 'Wheat' },
  { name: 'Bug' },
  { name: 'Akintas Papari' }
]
const alert: AlertCreateInput = {
  alertType: 'alert',
  details: 'All your Crops are belong to us!'
}
const comment: CommentCreateWithoutReplyInput = {
  content: "This is a comment on `Akintas Papari`",
}
async function seed() {
  // cleanup the existing database
  await prisma.user.deleteMany({ where: { email: { in: [expert.email, farmer.email] } } }).catch(() => {
    // no worries if it doesn't exist yet
  });
  await prisma.farm.deleteMany({ where: { name: farm.name } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  await prisma.crop.deleteMany({ where: { name: { in: crops.map(c => c.name) } } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  await prisma.alert.deleteMany({ where: { details: alert.details } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  await prisma.readReciept.deleteMany({ where: { alert: { details: alert.details } } }).catch(() => {
    // no worries if it doesn't exist yet
  });
  await prisma.post.deleteMany({ where: { title: post.title } }).catch(() => {
    // no worries if it doesn't exist yet`
  });
  await prisma.comment.deleteMany({ where: { content: comment.content } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  await prisma.region.deleteMany().catch(() => {
    // no worries if it doesn't exist yet
  });

  await prisma.postTag.deleteMany({ where: { name: { in: tags.map(tag => tag.name) } } }).catch(() => {
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

  const createdExpert = await prisma.user.create({
    data: prismaUserData(expert)
  });

  const createdFarmer = await prisma.user.create({
    data: prismaUserData(farmer),
  });

  await prisma.farm.create({
    data: prismaFarmData
  })

  await prisma.crop.createMany({
    data: crops
  })

  // Add Potato To Farm
  await prisma.crop.update({
    where: {
      name: crops[0].name
    }, data: {
      farms: {
        connect: {
          name: farm.name
        }
      },
    }
  })

  // Add Maize To Farm
  await prisma.crop.update({
    where: {
      name: crops[1].name
    }, data: {
      farms: {
        connect: {
          name: farm.name
        }
      }
    }
  })

  // Connect Alert to Potato
  await prisma.alert.create({
    data: {
      ...alert,
      affectedCrops: {
        connect: {
          name: crops[0].name
        }
      },
      affectedRegions: {
        connect: {
          name: farmer.region
        }
      }
    }
  })

  // farmer reads the alert
  await prisma.readReciept.create({
    data: {
      readBy: {
        connect: {
          email: farmer.email
        },
      },
      alert: {
        connect: {
          details: alert.details
        }
      }
    }
  })

  const createdPost = await prisma.post.create({
    data: {
      ...post,
      postedBy: {
        connect: {
          id: createdFarmer.id
        }
      },
      tags: {
        connectOrCreate: tags.map(tag => ({
          create: { name: tag.name },
          where: { name: tag.name }
        }))
      }
    }
  })
  await prisma.comment.create({
    data: {
      ...comment,
      commenter: {
        connect: {
          id: createdExpert.id
        }
      },
      postedFor: {
        connect: {
          id: createdPost.id
        }
      }
    }
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