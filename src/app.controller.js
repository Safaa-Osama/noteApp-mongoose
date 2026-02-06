import express from 'express';
import { testDBConnection } from './DB/connection.js';
import { userRouter } from './modules/user/user.controller.js';
import CS from "./config/config.service.js";

const app = express();
const port = CS.port;

 const bootstrap = () => {

    if (!port) {
        throw new Error("PORT is not defined in .env");
    }

    app.use(express.json());

    app.get('/', (req, res, next) => {
        res.json({ message: 'Hello on NoteApp .....' });
    });

    testDBConnection();

    app.use('/users', userRouter);

    
    app.use('{/*demo}', (req, res, next) => {
        res.status(404).json({
            message: `URL "${req.originalUrl}" NOT FOUND`
        });
    });

    app.use((err, req, res, next) => {
        res.status(err.cause || 500).json({
            message: err.message,
            stack: err.stack
        });
    });

    app.listen(port, () =>
        console.log(`Your app listening at ${port}`)
    );
};


export default bootstrap;
