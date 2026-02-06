import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  
});

export const userModel = mongoose.models.note || mongoose.model("note", noteSchema);