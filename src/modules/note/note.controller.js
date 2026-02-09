import { Router } from "express";
import * as NS from './note.service.js';

export const noteRouter = Router();

noteRouter.get("/",NS.getAllNotes);
noteRouter.get("/content",NS.getuserNotes);
noteRouter.get("/aggregate-note",NS.aggregateNote);
noteRouter.get("/paginate-sort",NS.getPaginatedNotes);
noteRouter.get("/:id", NS.noteById);


noteRouter.post('/add-note', NS.addNote);

noteRouter.patch('/update-note/:noteId', NS.updateNote);
noteRouter.patch("/update-many", NS.updateManyNotes);

noteRouter.delete('/delete-note/:noteId', NS.deleteNote);
noteRouter.delete('/delete-many', NS.deleteAll);


noteRouter.put('/replace-note/:noteId', NS.replaceNote);

