import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "../../lib/utils";
import { addTodo, editTodo } from "../../redux/features/todo/todoSlice";
import { RootState } from "../../redux/store";
import { Todo, TodoSchema } from "../../schema/TodoSchema";

interface CreateAndEditModalProps {
  id: number | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (todo: Todo) => void;
}

export default function CreateAndEditModal({
  id,
  isOpen,
  onOpenChange,
  onSave,
}: CreateAndEditModalProps) {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Todo>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      id: 0,
      name: "",
      completed: false,
      repetitiveness: "",
      priority: "low",
      dueDate: new Date().toISOString(),
    },
  });

  useEffect(() => {
    if (id) {
      const todo = todos.find((todo) => todo.id === id);
      if (todo) {
        reset({
          ...todo,
          dueDate: new Date(todo.dueDate).toISOString(),
        });
      }
    } else {
      reset({
        id: 0,
        name: "",
        completed: false,
        repetitiveness: "",
        priority: "low",
        dueDate: new Date().toISOString(),
      });
    }
  }, [id, isOpen, todos, reset]);

  const onSubmit = (data: Todo) => {
    const newTodo: Todo = {
      ...data,
      id: id || Math.max(0, ...todos.map((t) => t.id)) + 1,
    };

    if (id) {
      dispatch(editTodo(newTodo));
    } else {
      dispatch(addTodo(newTodo));
    }

    onSave(newTodo);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{id ? "Edit Todo" : "Create Todo"}</DialogTitle>
          <DialogDescription>
            {id
              ? "Make changes to your todo here."
              : "Fill in the details for your new todo."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Todo Name</Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input id="name" {...field} className="col-span-3" />
              )}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <Controller
            name="repetitiveness"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Repetitiveness" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Daily">Daily</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.repetitiveness && (
            <p className="text-sm text-red-500">
              {errors.repetitiveness.message}
            </p>
          )}

          <div>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="r1" />
                    <Label htmlFor="r1">High</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="r2" />
                    <Label htmlFor="r2">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="r3" />
                    <Label htmlFor="r3">Low</Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>
          {errors.priority && (
            <p className="text-sm text-red-500">{errors.priority.message}</p>
          )}

          <div>
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(new Date(field.value), "d MMM, yyyy")
                      ) : (
                        <span>Pick a due date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="flex w-auto flex-col space-y-2 p-2"
                  >
                    <Select
                      onValueChange={(value) =>
                        field.onChange(
                          addDays(new Date(), parseInt(value)).toISOString()
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="0">Today</SelectItem>
                        <SelectItem value="1">Tomorrow</SelectItem>
                        <SelectItem value="3">In 3 days</SelectItem>
                        <SelectItem value="7">In a week</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="rounded-md border">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={(date) => field.onChange(date?.toISOString())}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            />
          </div>
          {errors.dueDate && (
            <p className="text-sm text-red-500">{errors.dueDate.message}</p>
          )}

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
