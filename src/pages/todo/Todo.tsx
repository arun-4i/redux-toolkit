import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  editTodo,
  deleteTodo,
  toggleTodo,
} from "../../redux/features/todo/todoSlice";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import CreateAndEditModal from "../../components/todo/CreateAndEditModal";
import { RootState } from "../../redux/store";
import DeleteModal from "../../components/todo/DeleteModal";
import { Todo as TodoType } from "src/types/Todo";
import { format } from "date-fns";
import { Checkbox } from "../../components/ui/checkbox";

export default function Todo() {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const handleDeleteClick = (todoId: number) => {
    setSelectedTodoId(todoId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTodoId !== null) {
      dispatch(deleteTodo(selectedTodoId));
    }
    setIsDeleteModalOpen(false);
  };

  const handleEditClick = (todo: TodoType) => {
    setSelectedTodoId(todo.id);
    setIsEditModalOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedTodoId(null);
    setIsEditModalOpen(true);
  };

  const handleSaveTodo = (todo: TodoType) => {
    if (todo.id) {
      dispatch(editTodo(todo));
    } else {
      dispatch(addTodo(todo));
    }
    setIsEditModalOpen(false);
  };

  const handleToggleCompletion = (todoId: number) => {
    dispatch(toggleTodo(todoId));
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-4">
      <div className="container mx-auto p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{currentDate}</h2>
          <Button onClick={handleCreateClick}>
            <PlusCircle className="mr-2" /> Create Todo
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Done</TableHead>
                <TableHead>Todo Name</TableHead>
                <TableHead>Repetitiveness</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todos.map((todo) => (
                <TableRow
                  key={todo.id}
                  className={`transition-colors ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  <TableCell>
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => handleToggleCompletion(todo.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{todo.name}</TableCell>
                  <TableCell>{todo.repetitiveness}</TableCell>
                  <TableCell>{todo.priority}</TableCell>
                  <TableCell>
                    {todo.dueDate
                      ? format(new Date(todo.dueDate), "d MMM, yyyy")
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() => handleEditClick(todo)}
                      variant="ghost"
                      size="icon"
                      className="mr-2"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(todo.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <CreateAndEditModal
        id={selectedTodoId}
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSave={handleSaveTodo}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}
