import { Router } from 'express';
import {
  addNote,
  deleteNote,
  getNote,
  listNotes,
  updateNote,
} from '../controllers/note.js';

const router = Router();

router.get('/:sessionId', listNotes);

router.get('/:sessionId/:id', getNote);

router.post('/:sessionId', addNote);

router.put('/:sessionId/:id', updateNote);

router.delete('/:sessionId/:id', deleteNote);

export default router;
