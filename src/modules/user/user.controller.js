import Router  from "express";
import * as US from './user.service.js'

export const userRouter = Router();

userRouter.post('/sign-up', US.signUp);
userRouter.post('/sign-in', US.signIn);


