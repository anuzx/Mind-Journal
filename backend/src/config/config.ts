import dotenv from "dotenv"
dotenv.config()

const _config = {
  port: process.env.PORT,
  dburl: process.env.MONGODB_URI,
  jwt: process.env.JWT_SECRET,
  env: process.env.NODE_ENV
}


export const config = Object.freeze(_config)
