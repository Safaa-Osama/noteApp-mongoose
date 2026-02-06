import { configDotenv } from "dotenv";
import path from "path";

configDotenv({
    path: path.resolve('./src/config/.env')
});

export default {
    port: process.env.PORT
};
