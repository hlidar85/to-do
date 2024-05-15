import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";
import {
  Box,
  Button,
  Container,
  Select,
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
  const statuses = await prisma.status.findMany();
  const toDoItems = await prisma.toDo.findMany();
  return (
    <main>
      <Container maxWidth="50rem">
        <Text>Hello world</Text>

        <Box>
          <form action={addToDo}>
            <TextArea name="toDoItem" size="1" placeholder="To Do" />
            <Button mt="5" type="submit">
              Add to do
            </Button>
          </form>
        </Box>
        <Box>
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
                  <Table.Cell align="right">
                    <Select.Root defaultValue={toDo.statusId}>
                      <Select.Trigger />
                      <Select.Content>
                        <Select.Group>
                          <Select.Label>Status</Select.Label>
                          {statuses.map((status) => (
                            <Select.Item
                              key={status.status}
                              value={status.status}
                            >
                              {status.DisplayNames}
                            </Select.Item>
                          ))}
                        </Select.Group>
                        <Select.Group>
                          <Select.Label>action</Select.Label>
                          <Select.Item value="edit">Edit</Select.Item>
                          <Select.Item value="delete">
                            <Text>Delete</Text>
                          </Select.Item>
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
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
