import prisma from "./client";

const main = async () => {
  const open = await prisma.status.upsert({
    where: { status: "OPEN" },
    update: {},
    create: {
      status: "OPEN",
      DisplayNames: "Open",
      color: "red",
    },
  });
  const inProgress = await prisma.status.upsert({
    where: { status: "IN_PROGRESS" },
    update: {},
    create: {
      status: "IN_PROGRESS",
      DisplayNames: "In progress",
      color: "orange",
    },
  });
  const close = await prisma.status.upsert({
    where: { status: "CLOSE" },
    update: {},
    create: {
      status: "CLOSE",
      DisplayNames: "Close",
      color: "green",
    },
  });
  const priorityLow = await prisma.priority.upsert({
    where: { id: 0 },
    update: {},
    create: {
      id: 0,
      DisplayNames: "Low",
    },
  });
  const priorityMedium = await prisma.priority.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      DisplayNames: "Medium",
    },
  });
  const priorityHigh = await prisma.priority.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      DisplayNames: "High",
    },
  });
  await prisma.toDo.deleteMany();
  const issue1 = await prisma.toDo.create({
    data: { toDo: "To do item 1" },
  });
  const issue2 = await prisma.toDo.create({
    data: { toDo: "To do item 2", statusId: "IN_PROGRESS", priorityId: 2 },
  });
  const issue3 = await prisma.toDo.create({
    data: { toDo: "To do item 3", statusId: "CLOSE", priorityId: 1 },
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
