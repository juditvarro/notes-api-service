import { z } from 'zod';

export const NoteIdSchema = z.string();

export const NoteSessionIdSchema = z.string();

export const NoteSchema = z.object({
  title: z.string(),
  content: z.optional(z.string()),
  important: z.nullable(z.boolean()),
});

export const PartialNoteSchema = NoteSchema.partial();
