import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  editTodo,
  deleteTodo,
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
import TaskDetailsSidebar from "../../components/todo/TaskDetailsSidebar";
import { RootState } from "../../redux/store";
import DeleteModal from "../../components/todo/DeleteModal";
import { Todo as Task } from "src/types/Todo";

const Todo = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.todos.todos);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const handleCloseModal = useCallback(() => {
    setIsDetailsModalOpen(false);
    setIsEditModalOpen(false);
    setIsDialogOpen(false);
  }, []);

  const handleDeleteClick = (taskId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click event
    setSelectedTaskId(taskId);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTaskId !== null) {
      dispatch(deleteTodo(selectedTaskId));
      setSelectedTaskId(null);
    }
    handleCloseModal();
  };

  const handleCancelDelete = () => {
    handleCloseModal();
  };

  const handleEditClick = (task: Task, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click event
    setCurrentTask(task);
    setIsEditModalOpen(true);
  };

  const handleCreateClick = () => {
    setCurrentTask(null);
    setIsEditModalOpen(true);
  };

  const handleRowClick = (task: Task) => {
    setCurrentTask(task);
    setIsDetailsModalOpen(true);
  };

  const handleSaveTask = useCallback(
    (task: Task | null) => {
      if (task) {
        if (task.id) {
          dispatch(
            editTodo({
              id: task.id,
              name: task.name,
              repetitiveness: task.repetitiveness,
              priority: task.priority,
              date: task.dueDate ?? "",
            })
          );
        } else {
          dispatch(
            addTodo({
              name: task.name,
              repetitiveness: task.repetitiveness,
              priority: task.priority,
              date: task.dueDate ?? "",
            })
          );
        }
      }
      handleCloseModal();
    },
    [dispatch, handleCloseModal]
  );

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
            <PlusCircle className="mr-2" /> Create Task
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task Name</TableHead>
                <TableHead>Repetitiveness</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow
                  key={task.id}
                  onClick={() => handleRowClick(task)}
                  className="cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <TableCell className="font-medium">{task.name}</TableCell>
                  <TableCell>{task.repetitiveness}</TableCell>
                  <TableCell>{task.priority}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={(e) => handleEditClick(task, e)}
                      variant="ghost"
                      size="icon"
                      className="mr-2"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handleDeleteClick(task.id, e)}
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

      {isDetailsModalOpen && (
        <TaskDetailsSidebar task={currentTask} onClose={handleCloseModal} />
      )}
      {isEditModalOpen && (
        <CreateAndEditModal
          id={currentTask?.id ?? null}
          isOpen={isEditModalOpen}
          onOpenChange={handleCloseModal}
          onSave={handleSaveTask}
        />
      )}
      <DeleteModal
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default Todo;
