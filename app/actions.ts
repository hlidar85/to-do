"use server";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const statusChange = async (id: number, status: string) => {
  if (status === "delete") {
    await prisma.toDo.delete({ where: { id: id } });
  } else if (status === "edit") {
    console.log("edit");
    redirect("/?toDoEditId=" + id);
    return;
  } else {
    await prisma.toDo.update({
      where: { id: id },
      data: { statusId: status },
    });
  }
  revalidatePath("/");
};

export const addToDo = async (fromdata: FormData) => {
  "use server";
  const toDo = fromdata.get("toDoItem") as string;
  const id = parseInt(fromdata.get("toDoId") as string);
  if (id !== 0) {
    await prisma.toDo.update({ where: { id: id }, data: { toDo: toDo } });
    redirect("/");
  }
  await prisma.toDo.create({
    data: { toDo: toDo },
  });
  revalidatePath("/");
};
