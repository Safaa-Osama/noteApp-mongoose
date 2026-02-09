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

    const authorization = req.headers.authorization;
    if (!authorization) {
        return next(new Error("userToken not valid"));
    }

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.id;

    const { title, content } = req.body;

    const updatedNote = await db_services.updateOne({
        model: noteModel,
        filter: { _id: noteId, userId: userId },
        update: { title, content }
    });

    if (!updatedNote) {
        return next(new Error("Note not found or you are not the owner"));
    }

    return res.status(200).json({ message: "note updated", updatedNote });
};

export const updateManyNotes = async (req, res, next) => {

    const authorization = req.headers.authorization;
    if (!authorization) {
        return next(new Error("userToken not valid"));
    }

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.id;

    const { title } = req.body;
    if (!title) {
        return next(new Error("Title is required"));
    }

    const result = await db_services.updateMany({
        model: noteModel,
        filter: { userId },
        update: { $set: { title } }
    });

    return res.status(200).json({ message: "notes updated", result });
};

export const deleteNote = async (req, res, next) => {
    const { noteId } = req.params;

    const authorization = req.headers.authorization;
    if (!authorization) {
        return next(new Error("userToken not valid"));
    }

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.id;


    const deletedNote = await db_services.deleteOne({
        model: noteModel,
        filter: { _id: noteId, userId: userId },

    });

    if (!deletedNote) {
        return next(new Error("Note not found or you are not the owner"));
    }

    return res.status(200).json({ message: "note deleted", deletedNote });
};

export const replaceNote = async (req, res, next) => {
    const { noteId } = req.params;
    const { title, content } = req.body;

    const authorization = req.headers.authorization;
    if (!authorization) {
        return next(new Error("userToken not valid"));
    }

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.id;

    const newNote = await db_services.replaceOne({
        model: noteModel,
        filter: { _id: noteId, userId: userId },
        replacement: { title, content, userId },
    });
    if (newNote.matchedCount === 0) {
        return next(new Error("Note not found or unauthorized"));
    }
    return res.status(200).json({ message: "note replaced", newNote });
};

export const getAllNotes = async (req, res, next) => {
    const notes = await db_services.findAll(noteModel);
    return res.status(200).json({ message: "done", notes })
}

export const getuserNotes = async (req, res, next) => {

    const authorization = req.headers.authorization;
    if (!authorization) {
        return next(new Error("userToken not valid"));
    }

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.id;

    const { content } = req.query;
    if (!content) {
        return next(new Error("content replaced"))
    }

    const notes = await db_services.find({
        model: noteModel,
        filter: {
            userId: userId,
            content: { $regex: content, $options: "i" }
        },
    });

    return res.status(200).json({ message: "done", count: notes.length, notes });
};

export const deleteAll= async(req,res, next)=>{

    const authorization = req.headers.authorization;
    if (!authorization) {
        return next(new Error("userToken not valid"));
    }

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.id;


    const result = await db_services.deleteMany({
        model: noteModel,
        filter: { userId },

    });

    if (!result) {
        return next(new Error("Note not found or you are not the owner"));
    }

    return res.status(200).json({ message: " deleted" });
}

