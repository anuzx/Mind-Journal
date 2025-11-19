import { Request, Response, } from "express";
import express from "express";
import { User } from "../model/users.model.js";

const app = express()
app.use(express.json())


const signUp = async (req: Request, res: Response) => {
    //TODO:ZOD AND HASH PASS
    const { username, password } = req.body;
    const user = await User.create({
        username,
        password,
    })
    if (user) {
        return res
            .status(411)
            .json({
                message:"user registered already"
            })  
    }
}

export {
    signUp,
}