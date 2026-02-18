import Router  from "express";
import * as US from './user.service.js'
import { authontication } from "../../common/middleware/authontication.js";

export const userRouter = Router();


userRouter.post('/sign-up', US.signUp);
userRouter.post('/sign-in', US.signIn);
userRouter.get('/', US.getAllUsers);
userRouter.get('/by-id',authontication, US.getById);

userRouter.patch('/update', authontication,US.updateEmail);

userRouter.delete('/delete',authontication, US.deleteUser);

userRouter.get('/',US.getById);

