import Router  from "express";
import * as US from './user.service.js'

export const userRouter = Router();


userRouter.post('/sign-up', US.signUp);
userRouter.post('/sign-in', US.signIn);
userRouter.get('/', US.getAllUsers);
userRouter.get('/by-id', US.getById);

userRouter.patch('/update', US.updateEmail);

userRouter.delete('/delete', US.deleteUser);

userRouter.get('/',US.getById);

