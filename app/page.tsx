import prisma from "@/prisma/client";
import {
  Box,
  Button,
  Card,
  Container,
  Table,
  Text,
  TextArea,
} from "@radix-ui/themes";
import { revalidatePath } from "next/cache";
import Selector from "./Selector";
import ToDoForm from "./ToDoForm";
import { redirect } from "next/navigation";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowRightIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { ToDo } from "@prisma/client";

export default async function Home({
  searchParams,
}: {
  searchParams: { toDoEditId: string; orderBy: keyof ToDo };
}) {
  const orderBy = searchParams.orderBy ? searchParams.orderBy : "id";
  const toDoItems = await prisma.toDo.findMany({
    orderBy: { [orderBy]: "desc" },
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
                {columns.map((colum) => (
                  <Table.Cell key={colum.value} align={colum.align}>
                    <Link
                      href={{
                        query: { ...searchParams, orderBy: colum.value },
                      }}
                    >
                      {colum.label}
                    </Link>
                  </Table.Cell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {toDoItems.map((toDo) => (
                <Table.Row key={toDo.id}>
                  <Table.Cell align="left">
                    {toDo.priorityId === 0 ? (
                      <ArrowDownIcon color="blue" />
                    ) : toDo.priorityId === 1 ? (
                      <ArrowRightIcon color="orange" />
                    ) : (
                      <ArrowUpIcon color="red" />
                    )}
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
