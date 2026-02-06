import mongoose from "mongoose";
import { providerEnum } from "../../common/enum/user.enum.js";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: 3,
        maxLength: 10,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 10,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        min: 18,
        max: 60
    },
    provider: {
        type: String,
        enum: Object.values(providerEnum),
        default: providerEnum.system
    }
}, {
    timestamps: true,
    strictQuery: true,
    strict: true,
    toJSON: { virtuals: true },
    toObject: true

});

userSchema.virtual("userName")
    .get(function () {
        return this.firstName + " " + this.lastName
    }).set(function (value) {
        const { firstName, lastName } = value.split(" ")
        this.set({ firstName, lastName })
    })

export const userModel = mongoose.models.user || mongoose.model("user", userSchema);