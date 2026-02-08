import * as db_services from "../../DB/database.services.js"
import { noteModel } from "../../DB/models/note.model.js";
import jwt from "jsonwebtoken";

const secretKey = process.env.secretKey;


export const addNote = async (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization) {
        return next(new Error("userToken not valid"))
    }
    const token = authorization.split(" ")[1];


    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.id
        ;
    const { title, content } = req.body;

    const note = await db_services.create({
        model: noteModel,
        data: { title, content, userId }
    });
    res.status(201).json({ message: "note created", note })
}

export const updateNote = async (req, res, next) => {
    const { noteId } = req.params;

    const authorization = req.headers.authorization
  
    if (!authorization) {
        return next(new Error("userToken not valid"))
    }
    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.id;


    const note = await db_services.findOne({
        model:noteModel,
        filter:{_id:userId}
    })

    if (!note) {
        return next(new Error("Note not found"))
    }
    if (note.userId != userId) {
        return next(new Error("You are not the owner"))
    }
    const { title, content } = req.body;
    const newNote = await db_services.updateOne({
        model: noteModel,
        filter: { _id: noteId, userId: userId },
        update: { title,content }
    });
    return res.status(200).json({ message: "note updated", newNote })

}

