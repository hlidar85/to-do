"use client";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from "@radix-ui/react-icons";
import { Select } from "@radix-ui/themes";
import React from "react";
import { priorityChange } from "./actions";

const SelectPriority = ({
  priorityId,
  toDoId,
}: {
  priorityId: number;
  toDoId: number;
}) => {
  return (
    <Select.Root
      defaultValue={priorityId.toString()}
      onValueChange={(value) => priorityChange(toDoId, parseInt(value))}
    >
      <Select.Trigger variant="ghost" />
      <Select.Content>
        <Select.Item value="0">
          <ArrowDownIcon color="blue" />
        </Select.Item>
        <Select.Item value="1">
          <ArrowRightIcon color="orange" />
        </Select.Item>
        <Select.Item value="2">
          <ArrowUpIcon color="red" />
        </Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export default SelectPriority;
