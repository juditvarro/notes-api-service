import { NextFunction, Request, Response } from 'express';
import {
  createNote,
  deleteNoteById,
  getNoteById,
  getNotesBySessionId,
  updateNoteById,
} from '../models/note.js';
import { HTTPError, NotFoundError } from '../errors/index.js';
import { ApplicationError } from '../errors/custom.js';
import {
  NoteIdSchema,
  NoteSchema,
  NoteSessionIdSchema,
  PartialNoteSchema,
} from '../schemas/note.js';
import { validateSchema } from '../utilities/validateSchema.js';

export const listNotes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    validateSchema(NoteSessionIdSchema, req.params.sessionId, 'sessionId');

    const notes = await getNotesBySessionId(req.params.sessionId);

    if (!notes) {
      throw new NotFoundError(
        `Cannot find notes with session ID '${req.params.sessionId}'`,
        404,
      );
    }

    res.status(200).json(notes);
  } catch (err) {
    console.log(err);
    if (err instanceof ApplicationError) {
      return next(err);
    }
    return next(new HTTPError('Failed to fetch notes from database', 400));
  }
};

export const getNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    validateSchema(NoteSessionIdSchema, req.params.sessionId, 'sessionId');
    validateSchema(NoteIdSchema, req.params.id, 'id');

    const note = await getNoteById(req.params.id);

    if (!note) {
      throw new NotFoundError(
        `Cannot find note with ID '${req.params.id}'`,
        404,
      );
    }

    res.status(200).json(note);
  } catch (err) {
    console.log(err);
    if (err instanceof ApplicationError) {
      return next(err);
    }
    return next(new HTTPError('Failed to fetch note from database', 400));
  }
};

export const addNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    validateSchema(NoteSessionIdSchema, req.params.sessionId, 'sessionId');
    validateSchema(NoteSchema, req.body, 'body');

    const { userName, title, content } = req.body;
    const note = await createNote({
      sessionId: req.params.sessionId,
      userName,
      title,
      content,
    });
    res.status(201).json(note);
  } catch (err) {
    console.log(err);
    if (err instanceof ApplicationError) {
      return next(err);
    }
    return next(new HTTPError('Failed to create note', 400));
  }
};

export const updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    validateSchema(NoteSessionIdSchema, req.params.sessionId, 'sessionId');
    validateSchema(NoteIdSchema, req.params.id, 'id');
    validateSchema(PartialNoteSchema, req.body, 'body');

    const { userName, title, content } = req.body;
    await updateNoteById(req.params.id, {
      sessionId: req.params.sessionId,
      userName,
      title,
      content,
    });
    res.status(204).end();
  } catch (err) {
    console.log(err);
    if (err instanceof ApplicationError) {
      return next(err);
    }
    return next(new HTTPError('Failed to update note', 400));
  }
};

export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    validateSchema(NoteIdSchema, req.params.id, 'id');
    await deleteNoteById(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.log(err);
    if (err instanceof ApplicationError) {
      return next(err);
    }
    return next(new HTTPError('Failed to delete note', 400));
  }
};
