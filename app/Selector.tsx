"use client";
import { Status, ToDo } from "@prisma/client";
import { Badge, Select, Text } from "@radix-ui/themes";
import { statusChange } from "./actions";
import { useEffect, useState } from "react";

const Selector = ({ toDo, statuses }: { toDo: ToDo; statuses: Status[] }) => {
  const [value, setValue] = useState<string>();
  useEffect(() => {
    setValue(toDo.statusId);
  }, [toDo.statusId]);
  return (
    <form>
      <Select.Root
        key={toDo.id}
        defaultValue={toDo.statusId}
        value={value}
        onValueChange={(e) => {
          statusChange.bind(null, toDo.id);
          statusChange(toDo.id, e);
          setValue(toDo.statusId);
        }}
      >
        <Select.Trigger variant="ghost" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Status</Select.Label>
            {statuses.map((status) => (
              <Select.Item key={status.status} value={status.status}>
                <Badge color={status.color as "red" | "blue" | "green"}>
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
  );
};

export default Selector;
