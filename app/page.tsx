import prisma from "@/prisma/client";
import {
  Box,
  Button,
  Container,
  Table,
  Text,
  TextArea,
} from "@radix-ui/themes";
import { revalidatePath } from "next/cache";
import Selector from "./Selector";
import ToDoForm from "./ToDoForm";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { toDoEditId: string };
}) {
  const toDoItems = await prisma.toDo.findMany({ orderBy: { id: "desc" } });

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
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Cell>To Do Items</Table.Cell>
                <Table.Cell align="right">Created at</Table.Cell>
                <Table.Cell align="right">status</Table.Cell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {toDoItems.map((toDo) => (
                <Table.Row key={toDo.id}>
                  <Table.Cell>{toDo.toDo}</Table.Cell>
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
