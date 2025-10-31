import { z } from "zod";

export const createEntrySchema = z.object({
  title: z.string().min(1, "Title is required"),
 type: z.enum(["Movie", "TV Show"], {
  errorMap: () => ({ message: "Type must be Movie or TV Show" }),
}),


  director: z.string().optional(),
  budget: z.string().optional(),
  location: z.string().optional(),
  duration: z.string().optional(),
  year: z.string().optional(),
  posterUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export const updateEntrySchema = createEntrySchema.partial();
