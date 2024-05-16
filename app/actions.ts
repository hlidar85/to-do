"use server";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";

export const statusChange = async (id: number, status: string) => {
  if (status === "delete") {
    await prisma.toDo.delete({ where: { id: id } });
  } else if (status === "edit") {
    console.log("edit");
  } else {
    await prisma.toDo.update({
      where: { id: id },
      data: { statusId: status },
    });
  }
  revalidatePath("/");
};
