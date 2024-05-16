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
import Selector from "./Selector";

export default async function Home() {
  const addToDo = async (fromdata: FormData) => {
    "use server";
    await prisma.toDo.create({
      data: { toDo: fromdata.get("toDoItem") as string },
    });
    revalidatePath("/");
  };

  const toDoItems = await prisma.toDo.findMany();
  const statuses = await prisma.status.findMany();

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
