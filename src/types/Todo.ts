export interface Todo{
  id: number;
  name: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate: string; 
  repetitiveness: string;
}