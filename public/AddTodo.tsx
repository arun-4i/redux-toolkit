import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { PlusCircle } from "lucide-react";
import { addTodo } from "../src/redux/features/todo/todoSlice";

const AddTodo: React.FC = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add new todo Item"
          className="relative block w-full px-3 py-2 font-medium text-primaryDark shadow-lg rounded-md focus:outline-none"
        />
      </div>
      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-tertiary bg-primaryDark hover:bg-primaryLight"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Todo
        </button>
      </div>
    </form>
  );
};

export default AddTodo;
