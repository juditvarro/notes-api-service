import { z } from 'zod';

export const NoteIdSchema = z.string();

export const NoteSessionIdSchema = z.string();

export const NoteSchema = z.object({
  userName: z.string(),
  title: z.string(),
  content: z.optional(z.string()),
});

export const PartialNoteSchema = NoteSchema.partial();
