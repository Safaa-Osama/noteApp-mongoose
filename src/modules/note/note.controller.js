import { Router } from "express";
import * as NS from './note.service.js';

export const noteRouter = Router();

noteRouter.post('/add-note', NS.addNote);
noteRouter.patch('/update-note/:id', NS.updateNote)