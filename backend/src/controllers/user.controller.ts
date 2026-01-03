import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { UserModel } from "../model/users.model.js";
import { ContentModel } from "../model/content.model.js";
import { SigninSchema, SignupSchema } from "../schema/index.js";
import { JWT_SECRET } from "../constants.js";


const signUp = async (req: Request, res: Response) => {
  //TODO:ZOD AND HASH PASS -> DONE

  const parsedData = SignupSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "incoorect inputs",
    });
    return;
  }
  const hashedPassword = await bcrypt.hash(parsedData.data?.password, 10);

  try {
    await UserModel.create({
      username: parsedData.data?.username,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "user registered successfully",
    });
  } catch (e) {
    res.status(411).json({
      message: "user already exist",
    });
  }
};

const signIn = async (req: Request, res: Response) => {
  const parsedData = SigninSchema.safeParse(req.body)
  if (!parsedData.success) {
    res.json({
      message:"incoorect input"
    })
    return
  }
  try {
    const existingUser = await UserModel.findOne({
      username:parsedData.data.username
    });
    //if user exist sign the jwt and return it to the user
    if (!existingUser) {
      return res.status(401).json({
        message: "Invalid username",
      });
    }

    const validPassword = await bcrypt.compare(parsedData.data.password, existingUser.password)
    
    if (!validPassword) {
      res.status(401).json({
        message:"invalid password"
      })
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

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
    userId: userId,
  }).populate("userId", "username"); //this will bring everything inside userId , but we dont want password etc.
  res.json({
    content,
  });
};

export { signUp, signIn, postContent, getContent };
