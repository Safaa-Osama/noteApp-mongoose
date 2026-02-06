import dotenv from "dotenv";
// import path from "path";

dotenv.config({ path: './config/.env' });

// configDotenv({
//     path: path.resolve('../config/config.service.js')
// });
let port = process.env.PORT;
let secretKey = process.env.SECRETKEY;
let DB_url = process.env.DB_URL

export {
    port,
    secretKey,
    DB_url
};
