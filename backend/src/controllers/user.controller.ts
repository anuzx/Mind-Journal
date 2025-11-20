import express from "express";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken"
import { UserModel } from "../model/users.model.js";
import { ContentModel } from "../model/content.model.js";
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in environment variables");
}
const app = express();
app.use(express.json());

const signUp = async (req: Request, res: Response) => {
    //TODO:ZOD AND HASH PASS
   // console.log("BODY:", req.body); //for debug
    const { username, password } = req.body;
    
    try {
         await UserModel.create({
            username: username,
            password: password,
        });

        res.status(201).json({
            message: "user registered successfully",
        });
    } catch (e) {
        res.status(411).json({
            message:"user already exist"
        })
    }
};

const signIn = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const existingUser = await UserModel.findOne({
            username,
            password

        })
        //if user exist sign the jwt and return it to the user
        if (!existingUser) {
          return res.status(401).json({
            message: "Invalid username or password",
          });
        }

        const token = jwt.sign({
            id: existingUser._id
        }, JWT_SECRET, {
          expiresIn: "7d",
        });

        return res.status(200).json({
          message: "Login successful",
          token,
        });
    } catch (error) {
         res.status(411).json({
           message: "No such User",
         });
    }
    
};


const postContent = async (req: Request, res: Response) => {
  try {
    const { link, type, title, description, tags } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    const content = await ContentModel.create({
      link,
      type,
      title,
      description,
      userId: req.userId,
      tags: tags || [],
    });

    res.status(201).json({
      message: "content added",
      content,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


const getContent = async (req: Request, res: Response) => {
    
    const userId = req.userId;
    const content = await ContentModel.find({
        userId:userId
    }).populate("userId","username") //this will bring everything inside userId , but we dont want password etc.
    res.json({
        content
    })
}

export { signUp, signIn , postContent , getContent };
