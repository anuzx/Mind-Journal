import dotenv from "dotenv"
dotenv.config()

const _config = {
  port: process.env.PORT,
  dburl: process.env.MONGODB_URI,
  at_jwt: process.env.ACCESSTOKEN_SECRET as string,
  rt_jwt: process.env.REFRESHTOKEN_SECRET as string,
  env: process.env.NODE_ENV
}


export const config = Object.freeze(_config)
