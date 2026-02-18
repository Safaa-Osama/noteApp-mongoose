import { Router } from "express";
import * as NS from './note.service.js';
import { authontication } from "../../common/middleware/authontication.js";

export const noteRouter = Router();

noteRouter.get("/", NS.getAllNotes);
noteRouter.get("/content",authontication, NS.getuserNotes);
noteRouter.get("/aggregate-note", authontication, NS.aggregateNote);
noteRouter.get("/paginate-sort", authontication,NS.getPaginatedNotes);
noteRouter.get("/:id", authontication,NS.noteById);


noteRouter.post('/add-note', authontication, NS.addNote);

noteRouter.patch('/update-note/:noteId', authontication, NS.updateNote);
noteRouter.patch("/update-many", authontication, NS.updateManyNotes);

noteRouter.delete('/delete-note/:noteId', authontication, NS.deleteNote);
noteRouter.delete('/delete-many',authontication, NS.deleteAll);


noteRouter.put('/replace-note/:noteId', authontication, NS.replaceNote);

