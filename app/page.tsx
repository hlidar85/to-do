import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";
import {
  Badge,
  Box,
  Button,
  Container,
  Select,
  Table,
  Text,
  TextArea,
} from "@radix-ui/themes";
import { badgePropDefs } from "@radix-ui/themes/dist/esm/components/badge.props.d.ts";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const addToDo = async (fromdata: FormData) => {
    "use server";
    await prisma.toDo.create({
      data: { toDo: fromdata.get("toDoItem") as string },
    });
    revalidatePath("/");
  };
  const statusChange = async (id: number, status: string) => {
    "use server";
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

  const statuses = await prisma.status.findMany();
  const toDoItems = await prisma.toDo.findMany();
  return (
    <main>
      <Container maxWidth="50rem">
        <Box mb="5" mt="3">
          <Text as="div" size="8" align="center">
            To do test app
          </Text>
        </Box>

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
                <Table.Cell align="right">status</Table.Cell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {toDoItems.map((toDo) => (
                <Table.Row key={toDo.id}>
                  <Table.Cell>{toDo.toDo}</Table.Cell>
                  <Table.Cell align="right">
                    <form>
                      <Select.Root
                        key={toDo.id}
                        defaultValue={toDo.statusId}
                        onValueChange={statusChange.bind(null, toDo.id)}
                      >
                        <Select.Trigger variant="ghost" />
                        <Select.Content>
                          <Select.Group>
                            <Select.Label>Status</Select.Label>
                            {statuses.map((status) => (
                              <Select.Item
                                key={status.status}
                                value={status.status}
                              >
                                <Badge
                                  color={
                                    status.color as "red" | "blue" | "green"
                                  }
                                >
                                  {status.DisplayNames}
                                </Badge>
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
                    </form>
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
