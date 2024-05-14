import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";
import {
  Box,
  Button,
  Container,
  Table,
  Text,
  TextArea,
} from "@radix-ui/themes";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const addToDo = async (fromdata: FormData) => {
    "use server";
    await prisma.toDo.create({
      data: { toDo: fromdata.get("toDoItem") as string },
    });
    revalidatePath("/");
  };
  const toDoItems = await prisma.toDo.findMany();
  return (
    <main>
      <Container>
        <Text>Hello world</Text>

        <Box maxWidth="50rem">
          <form action={addToDo}>
            <TextArea name="toDoItem" size="1" placeholder="To Do" />
            <Button mt="5" type="submit">
              Add to do
            </Button>
          </form>
        </Box>
        <Box maxWidth="50rem">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Cell>To Do Items</Table.Cell>
                <Table.Cell>status</Table.Cell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {toDoItems.map((toDo) => (
                <Table.Row key={toDo.id}>
                  <Table.Cell>{toDo.toDo}</Table.Cell>
                  <Table.Cell>{toDo.statusId}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      </Container>
    </main>
  );
}
