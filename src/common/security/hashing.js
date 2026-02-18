
import { hashSync, compareSync } from "bcrypt"



export const hash = ({ text, salt_round = 12 } = {}) => {
    return hashSync(text, salt_round)
}

export const compare = ({ text, cipherTxt } = {}) => {
    return compareSync(text, cipherTxt)
}