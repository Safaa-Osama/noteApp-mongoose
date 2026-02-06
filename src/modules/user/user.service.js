import { providerEnum } from "../../common/enum/user.enum.js";
import { userModel } from "../../DB/models/user.model.js";
import * as db_service from "../../DB/database.services.js"
import jwt from "jsonwebtoken"

const secretKey = process.env.secretKey;

export const signUp = async (req, res, next) => {
    const { firstName, lastName, email, phone, password, age, provider } = req.body;
    if (await db_service.findOne(
        { model: userModel, filter: { email } }
    )) {
        return res.status(409).json({ message: "user already exist" })
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
    const user = await db_service.findOne(
        { model: userModel, filter: { email, provider: providerEnum.system } }
    )

    if (password !== user.password && email !== user.email) {
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

