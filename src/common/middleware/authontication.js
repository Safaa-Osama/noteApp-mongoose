import { secretKey } from "../../../config/config.service.js";
import { verifyToken } from "../security/token.js";
// import * as db_services from "../../DB/db.services.js"
// import userModel from "../../DB/models/user.model.js"


export const authontication = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        throw new Error("Invalid Autorization");
    }

    let decoded = verifyToken({
        token: authorization.split(" ")[1],
        secretKey: secretKey
    })

    if (!decoded) {
        throw new Error("Invalid Autorization");
    }

    req.decoded = decoded

    next();
}