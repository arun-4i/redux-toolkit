import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Edit2, Trash2, Save, Flag } from "lucide-react";
import {
  deleteTodo,
  editTodo,
  toggleTodo,
  updatePriority,
} from "../src/redux/features/todo/todoSlice";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: string;
}

interface TodoItemProps {
  todo: Todo;
}

const priorityConfig = {
  p1: { color: "bg-red-500", label: "High" },
  p2: { color: "bg-yellow-500", label: "Medium" },
  p3: { color: "bg-green-500", label: "Low" },
  p4: { color: "bg-gray-300", label: "None" },
};

const PriorityButton: React.FC<{
  priority: string;
  onClick: () => void;
  isActive: boolean;
}> = ({ priority, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
      isActive
        ? `${priorityConfig[priority].color} text-white`
        : "bg-gray-100 text-gray-600"
    } hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200`}
    aria-label={`Set priority to ${priorityConfig[priority].label}`}
    title={priorityConfig[priority].label}
  >
    <Flag className={`h-5 w-5 ${isActive ? "fill-current" : ""}`} />
  </button>
);

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const dispatch = useDispatch();

  const handleToggle = () => dispatch(toggleTodo(todo.id));
  const handleEdit = () => {
    if (editedText.trim() !== "") {
      dispatch(editTodo({ id: todo.id, text: editedText }));
      setIsEditing(false);
    }
  };
  const handleDelete = () => dispatch(deleteTodo(todo.id));
  const handlePriorityChange = (newPriority: string) => {
    dispatch(updatePriority({ id: todo.id, priority: newPriority }));
  };

  return (
    <div className="bg-tertiary rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 space-y-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div className="flex-grow min-w-0">
            {isEditing ? (
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onBlur={handleEdit}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleEdit();
                  }
                }}
                className="w-full px-2 py-1 text-gray-700 border-b-2 border-blue-500 focus:outline-none resize-none"
                rows={3}
                autoFocus
              />
            ) : (
              <p
                className={`text-lg ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-700"
                } break-words`}
              >
                {todo.text}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-1 text-gray-600 hover:text-blue-600 focus:outline-none transition-colors duration-200"
            >
              {isEditing ? (
                <Save className="h-5 w-5" />
              ) : (
                <Edit2 className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={handleDelete}
              className="p-1 text-gray-600 hover:text-red-600 transition-colors duration-200"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center bg-gray-50 rounded-lg p-2">
          <span className="text-sm text-gray-500 font-medium">Priority:</span>
          <div className="flex space-x-2">
            {Object.keys(priorityConfig).map((priority) => (
              <PriorityButton
                key={priority}
                priority={priority}
                onClick={() => handlePriorityChange(priority)}
                isActive={todo.priority === priority}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
