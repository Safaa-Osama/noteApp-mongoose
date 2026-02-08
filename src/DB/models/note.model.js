import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({

    title: {
        type: String,
        minLength: 5,
        required: true,
        trim: true,
        uppercase:true
    },
    content: {
        type: String,
        minLength: 10,
        required: true,
        trim: true
    },
    userId: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: "user",     
    required: true
}
}, {
    timestamps: true,
    strictQuery: true,
    strict: true,
});

export const noteModel = mongoose.models.note || mongoose.model("note", noteSchema);
