import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	console.log("Seeding data...");

	const user1 = await prisma.user.create({
		data: {
			id: "20K21116",
			name: "mizutani",
		},
	});

	const equipment1 = await prisma.equipment.create({
		data: {
			id: "cm8i9o4wv0000qn13dvccw2f3",
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
			equipmentId: "cm8i9o4wv0000qn13dvccw2f3",
			tagId: "mjfqjy1iyuplusaonrecuupk",
		},
	});

	const equipmentBorrowLog1 = await prisma.equipmentBorrowLogs.create({
		data: {
			equipmentId: "cm8i9o4wv0000qn13dvccw2f3",
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
