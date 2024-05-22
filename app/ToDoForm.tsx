"use client";

import { Button, TextArea } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { addToDo } from "./actions";
import { useRouter } from "next/navigation";

interface ToDo {
  id: number;
  toDo: string;
}

const ToDoForm = ({ toDoEdit }: { toDoEdit?: ToDo | undefined | null }) => {
  const [toDo, setDoTo] = useState<string>();
  const [toDoId, setDoToId] = useState<number>(0);
  useEffect(() => {
    setDoTo(toDoEdit?.toDo);
    setDoToId(toDoEdit?.id || 0);
  }, [toDoEdit]);
  const router = useRouter();

  return (
    <form
      action={(value) => {
        setDoTo("");
        addToDo(value);
      }}
    >
      <TextArea
        name="toDoItem"
        id="toDoItem"
        size="1"
        placeholder="To Do"
        value={toDo}
        onChange={(value) => setDoTo(value.target.value)}
      />
      <input
        type="number"
        name="toDoId"
        id="toDoId"
        hidden
        value={toDoId!}
        onChange={(value) => setDoToId(parseInt(value.target.value))}
      />
      <Button mt="5" type="submit">
        {toDoId !== 0 ? "Edit to do" : "Add to do"}
      </Button>
      {toDoId !== 0 && (
        <Button
          mt="5"
          color="crimson"
          type="button"
          onClick={() => {
            setDoTo("");
            router.push("/");
          }}
        >
          Cancel
        </Button>
      )}
    </form>
  );
};

export default ToDoForm;
