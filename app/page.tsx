import prisma from "@/prisma/client";
import { ToDo } from "@prisma/client";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from "@radix-ui/react-icons";
import { Box, Container, Select, Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import { redirect } from "next/navigation";
import Selector from "./Selector";
import ToDoForm from "./ToDoForm";
import { useState } from "react";
import SelectPriority from "./SelectPriority";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    toDoEditId: string;
    orderBy: keyof ToDo;
    order: "desc" | "asc" | undefined;
  };
}) {
  const orderBy = searchParams.orderBy ? searchParams.orderBy : "id";
  const order = searchParams.order ? searchParams.order : "asc";
  const toDoItems = await prisma.toDo.findMany({
    orderBy: { [orderBy]: order },
  });

  const statuses = await prisma.status.findMany();

  let toDoEdit;
  if (searchParams.toDoEditId) {
    toDoEdit = await prisma.toDo.findUnique({
      where: { id: parseInt(searchParams.toDoEditId) },
    });
    if (!toDoEdit) redirect("/");
  }

  return (
    <main>
      <Container maxWidth="50rem">
        <Box mb="5" mt="3">
          <Text as="div" size="8" align="center">
            To do test app
          </Text>
        </Box>

        <Box>
          <ToDoForm toDoEdit={toDoEdit} />
        </Box>
        <Box>
          <Table.Root variant="surface" mt="5">
            <Table.Header>
              <Table.Row>
                {columns.map((column) => (
                  <Table.Cell key={column.value} align={column.align}>
                    <Link
                      href={{
                        query: {
                          ...searchParams,
                          orderBy: column.value,
                          order:
                            searchParams.order == "asc" &&
                            column.value === searchParams.orderBy
                              ? "desc"
                              : "asc",
                        },
                      }}
                    >
                      {column.label}
                    </Link>
                  </Table.Cell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {toDoItems.map((toDo) => (
                <Table.Row key={toDo.id}>
                  <Table.Cell align="left">
                    <SelectPriority
                      priorityId={toDo.priorityId}
                      toDoId={toDo.id}
                    />
                  </Table.Cell>
                  <Table.Cell align="left">{toDo.toDo}</Table.Cell>
                  <Table.Cell align="right">
                    {toDo.createdAt.toDateString()}
                  </Table.Cell>
                  <Table.Cell align="right">
                    <Selector toDo={toDo} statuses={statuses} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      </Container>
    </main>
  );
}

const columns: {
  label: string;
  value: keyof ToDo;
  align?: "center" | "right" | "left" | "justify" | "char" | undefined;
}[] = [
  { label: "Priority", value: "priorityId", align: "left" },
  { label: "To Do Items", value: "toDo", align: "left" },
  { label: "Created at", value: "createdAt", align: "right" },
  { label: "Status", value: "statusId", align: "right" },
];

const flipOrder = (
  order: "desc" | "asc" | undefined,
  orderBy: keyof ToDo,
  newOrderBy: keyof ToDo
): "desc" | "asc" => {
  console.log(orderBy, newOrderBy);
  if (orderBy !== newOrderBy) {
    return "asc";
  }
  if (order === "desc") return "asc";
  return "desc";
};
