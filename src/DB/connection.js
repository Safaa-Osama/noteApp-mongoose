import mongoose from "mongoose";
import {DB_url} from '../../config/config.service.js'

export const testDBConnection = async () => {
    try {
        await mongoose.connect(DB_url,   { serverSelectionTimeoutMS: 5000 }   );
        console.log("Database connected");
    } catch (error) {
        console.log(error, "fail to connect");
    }
}
