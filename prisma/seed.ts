import prisma from "./client";

const main = async () => {
  const open = await prisma.status.upsert({
    where: { status: "OPEN" },
    update: {},
    create: {
      status: "OPEN",
    },
  });
  const inProgress = await prisma.status.upsert({
    where: { status: "IN_PROGRESS" },
    update: {},
    create: {
      status: "IN_PROGRESS",
    },
  });
  const close = await prisma.status.upsert({
    where: { status: "CLOSE" },
    update: {},
    create: {
      status: "CLOSE",
    },
  });
  await prisma.toDo.deleteMany();
  const issue1 = await prisma.toDo.create({
    data: { toDo: "issue 1", statusId: "IN_PROGRESS" },
  });
  const issue2 = await prisma.toDo.create({
    data: { toDo: "issue 2", statusId: "CLOSE" },
  });
  const issue3 = await prisma.toDo.create({
    data: { toDo: "issue 3" },
  });
  console.log(open, inProgress, close);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
