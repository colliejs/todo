"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoList } from "@/components/todos/TodoList";
import { Todo } from "@/lib/types";
import { api, TodoFilter, TodoSort } from "@/lib/api";
import { useToast } from "@/components/ToastProvider";

export default function Home() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const [filter, setFilter] = useState<TodoFilter>("all");
  const [sort, setSort] = useState<TodoSort>("createdAt");

  const { data: todos = [], isPending, isError } = useQuery({
    queryKey: ["todos", filter, sort],
    queryFn: () => api.getTodos({ status: filter, sortBy: sort }),
  });

  const createMutation = useMutation({
    mutationFn: ({ title, dueDate }: { title: string; dueDate?: string }) =>
      api.createTodo(title, dueDate),
    onMutate: async ({ title, dueDate }) => {
      await queryClient.cancelQueries({ queryKey: ["todos", filter, sort] });
      const previousTodos = queryClient.getQueryData<Todo[]>([
        "todos",
        filter,
        sort,
      ]);

      if (previousTodos) {
        const newTodo: Todo = {
          id: `temp-${Date.now()}`,
          title,
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...(dueDate && { dueDate }),
        };

        if (filter !== "completed") {
          queryClient.setQueryData<Todo[]>(["todos", filter, sort], (old) => [
            newTodo,
            ...(old || []),
          ]);
        }
      }
      return { previousTodos };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      showToast("待办事项创建成功", "success");
    },
    onError: (error, _, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(
          ["todos", filter, sort],
          context.previousTodos
        );
      }
      showToast("创建失败，请重试", "error");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Todo> }) =>
      api.updateTodo(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["todos", filter, sort] });
      const previousTodos = queryClient.getQueryData<Todo[]>([
        "todos",
        filter,
        sort,
      ]);

      if (previousTodos) {
        queryClient.setQueryData<Todo[]>(["todos", filter, sort], (old) => {
          if (!old) return [];

          if (data.completed !== undefined) {
            if (filter === "active" && data.completed) {
              return old.filter((t) => t.id !== id);
            }
            if (filter === "completed" && !data.completed) {
              return old.filter((t) => t.id !== id);
            }
          }

          return old.map((t) => (t.id === id ? { ...t, ...data } : t));
        });
      }
      return { previousTodos };
    },
    onSuccess: () => {
      showToast("待办事项更新成功", "success");
    },
    onError: (err, newTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(
          ["todos", filter, sort],
          context.previousTodos
        );
      }
      showToast("更新失败，请重试", "error");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: api.deleteTodo,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todos", filter, sort] });
      const previousTodos = queryClient.getQueryData<Todo[]>([
        "todos",
        filter,
        sort,
      ]);

      if (previousTodos) {
        queryClient.setQueryData<Todo[]>(["todos", filter, sort], (old) =>
          old?.filter((t) => t.id !== id)
        );
      }
      return { previousTodos };
    },
    onSuccess: () => {
      showToast("待办事项已删除", "success");
    },
    onError: (err, id, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(
          ["todos", filter, sort],
          context.previousTodos
        );
      }
      showToast("删除失败，请重试", "error");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAdd = (title: string, dueDate?: string) =>
    createMutation.mutate({ title, dueDate });

  const handleToggle = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (todo)
      updateMutation.mutate({ id, data: { completed: !todo.completed } });
  };
  const handleUpdate = (id: string, data: Partial<Todo>) =>
    updateMutation.mutate({ id, data });
  const handleDelete = (id: string) => deleteMutation.mutate(id);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "background.default",
        py: 4,
      }}
    >
      <TodoList
        todos={todos}
        onAdd={handleAdd}
        onToggle={handleToggle}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        filter={filter}
        onFilterChange={setFilter}
        sort={sort}
        onSortChange={setSort}
      />
    </Box>
  );
}
