import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { RootState } from "../src/redux/store";

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);

  return (
    <ul className="mt-8 space-y-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
