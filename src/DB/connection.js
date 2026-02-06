import mongoose from "mongoose";

export const testDBConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL,
            { serverSelectionTimeoutMS: 5000 }
        );
        console.log("Database connected");
    } catch (error) {
        console.log(error, "fail to connect");
    }
}
