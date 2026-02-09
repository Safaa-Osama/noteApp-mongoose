import { providerEnum } from "../../common/enum/user.enum.js";
import { userModel } from "../../DB/models/user.model.js";
import * as db_service from "../../DB/database.services.js";
import jwt from "jsonwebtoken";


const secretKey = process.env.secretKey;

export const signUp = async (req, res, next) => {
    const { firstName, lastName, email, phone, password, age, provider } = req.body;
    if (await db_service.findOne(
        { model: userModel, filter: { email } }
    )) {
        // return res.status(409).json({ message: "user already exist" })
        throw new Error("user already exist")
    }

    const user = await db_service.create({
        model: userModel, data: {
            firstName, lastName, email, phone, password, age, provider
        }
    });
    res.status(201).json({ massage: "user add successfully", user })
}

export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await db_service.findOne( {
         model: userModel,
          filter: { email, provider: providerEnum.system } }
    )
    if (password !== user.password) {
        // return res.status(400).json({ message: "Invalid enail or password" })
        next(new Error("Invalid enail or password"))
    }
    const token = await jwt.sign({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        age: user.age,
        phone: user.phone
    },
        secretKey,
        { expiresIn: '1h' }
    )
    res.status(201).json({ massage: "done", userToken: token, user });
}

export const getAllUsers = async (req, res, next) => {
    const users = await db_service.findAll(userModel)
    return res.status(200).json({ message: "done", users })
}

export const getById = async (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        next(new Error("token not valid"))
    }

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);

    const user = await userModel.findById(decoded.id);

    if (!user) {
        return next(new Error("User not found"))
    }

    res.status(200).json({ massage: "done", user });
}

export const updateEmail = async (req, res, next) => {

    const authorization = req.headers.authorization;
    const { email, age } = req.body;

    if (!authorization) {
        return res.status(401).json({ message: " invalid Token" });
    }

    const token = authorization.split(" ")[1];


    const decoded = jwt.verify(token, secretKey);

    const user = await userModel.findById(decoded.id);

    if (!user) {
        return next(new Error("User not found"))
    }
    if (email && email !== user.email) {

        if (await db_service.findOne({ model: userModel, filter: { email } })) {
            return next(new Error("Email already exists"));
        }
    }
    const updatedUser = await db_service.updateOne({
        model: userModel,
        filter: { _id: user._id },
        update: { email, age }
    });


    res.status(200).json({ massage: "User Updated", updatedUser });
}

export const deleteUser = async (req, res, next) => {

    const authorization = req.headers.authorization;
    // const {email} = req.body
    //  if (email && email !== user.email) {

    //     if (await db_service.findOne({ model: userModel, filter: { email } })) {
    //         return next(new Error("Email not exists"));
    //     }
    // }

    if (!authorization) {
        return res.status(401).json({ message: " invalid Token" });
    }

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);

    const user = await userModel.findById(decoded.id);

    if (!user) {
        return next(new Error("User not found"));
    }

    const deletedUser = await db_service.deleteOne({
        model: userModel,
        filter: { _id: user._id }
    });

    return res.status(200).json({ message: "User deleted successfully", deletedUser });
}

