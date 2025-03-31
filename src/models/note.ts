import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  updatedAt: { type: Date, required: true },
  title: { type: String, required: true },
  content: { type: String, required: false },
  important: { type: Boolean, required: false },
});

export const NoteModel = mongoose.model('Note', NoteSchema);
export const getNotes = () => NoteModel.find();
export const getNotesBySessionId = (sessionId: string) =>
  NoteModel.find({ sessionId });
export const getNoteById = (id: string) => NoteModel.findById(id);
export const createNote = (values: Record<string, unknown>) =>
  new NoteModel(values).save().then((note) => note.toObject());
export const deleteNoteById = (id: string) =>
  NoteModel.findOneAndDelete({ _id: id });
export const updateNoteById = (id: string, values: Record<string, unknown>) =>
  NoteModel.findByIdAndUpdate(id, values);
