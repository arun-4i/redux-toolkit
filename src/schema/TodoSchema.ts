import { z } from "zod";

export const TodoSchema = z.object({
  id: z.number().int().optional(), // Validates an integer for id
  name: z.string().min(3), // Validates non-empty string for name
  completed: z.boolean(), // Validates boolean for completed
  priority: z.enum(["low", "medium", "high"]), // Validates priority as one of the three options
  dueDate: z.string().refine(
    (date) => {
      const parsedDate = Date.parse(date);
      return !isNaN(parsedDate) && new Date(parsedDate) > new Date();
    },
    {
      message: "Due date must be a valid future date",
    }
  ),
  repetitiveness: z.string().min(1), // Validates non-empty string for repetitiveness
});

export type Todo = z.infer<typeof TodoSchema>; // Infers the type from the schema
