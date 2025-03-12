import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding data...");

  const user1 = await prisma.user.create({
    data: {
      id: "21k1116",
      name: "mizutani",
    },
  });

  const equipment1 = await prisma.equipment.create({
    data: {
      id: "v3u5iqgr8x3sgmklefyn2jxi",
      assetId: "1234-0000",
      name: "MacBook Pro",
      place: "梶研究室学生部屋",
    },
  });

  const tag1 = await prisma.tag.create({
    data: {
      id: "mjfqjy1iyuplusaonrecuupk",
      name: "PC",
    },
  });
  const tag2 = await prisma.tag.create({
    data: {
      id: "nsgv4v6ehlb9ha8ee51yebhs",
      name: "本",
    },
  });

  const equipmentTag1 = await prisma.equipmentTag.create({
    data: {
      equipmentId: "v3u5iqgr8x3sgmklefyn2jxi",
      tagId: "mjfqjy1iyuplusaonrecuupk",
    },
  });

  const equipmentBorrowLog1 = await prisma.equipmentBorrowLog.create({
    data: {
      id: "v3u5iqgr8x3sgmklefyn2jxi",
      equipmentId: "v3u5iqgr8x3sgmklefyn2jxi",
      userId: "21k1116",
    },
  });

  console.log("Data seeding complete.");
}

main()
  .catch((err) => {
    console.error("Error seeding data:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
