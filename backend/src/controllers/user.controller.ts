import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { asyncHandler } from "../utils/asyncHandler.js";
import { UserModel } from "../model/users.model.js";
import { ContentModel } from "../model/content.model.js";
import { ContentSchema, SigninSchema, SignupSchema } from "../validator/index.js";
import { config } from "../config/config.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiRes } from "../utils/ApiResponse.js";

const signUp = asyncHandler(async (req: Request, res: Response) => {

  const parsedData = SignupSchema.safeParse(req.body);
  if (!parsedData.success) {
    throw new ApiError("INVALID_REQUEST", 400)
  }
  const { username, email, password } = parsedData.data

  const existEmail = await UserModel.findOne({
    $or: [{ email }, { username }]
  })
  if (existEmail) {
    throw new ApiError("user already exist", 401)
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    email: email,
    username: username,
    password: hashedPassword,
  });

  const safeUser = await UserModel.findById(user._id).select("-password")

  return res.status(201).json(new ApiRes(201, "user created", safeUser));

});

const signIn = asyncHandler(async (req: Request, res: Response) => {
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    throw new ApiError("INVALID_REQUEST", 400)
  }
  const { email, password } = parsedData.data

  const existingUser = await UserModel.findOne({
    email: email
  });
  if (!existingUser) {
    throw new ApiError("inavlid email or password", 401)
  }

  const validPassword = await bcrypt.compare(
    password,
    existingUser.password,
  );

  if (!validPassword) {
    throw new ApiError("inavlid email or password", 401)
  }

  const token = jwt.sign(
    {
      id: existingUser._id,
    },
    config.jwt as string,
    {
      expiresIn: "7d",
    },
  );

  return res.status(200).json(new ApiRes(200, "login successfull", { token }));
});

const postContent = asyncHandler(async (req: Request, res: Response) => {
  const parsedData = ContentSchema.safeParse(req.body)

  if (!parsedData.success) {
    throw new ApiError("INVALID_REQUEST", 400)
  }

  const { link, description, type, tags, title } = parsedData.data

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
});

const getContent = async (req: Request, res: Response) => {
  const userId = req.userId;
  const content = await ContentModel.findById({
    userId: userId,
  }).populate("userId", "username"); //this will bring everything inside userId ,but we dont want password etc.
  res.json({
    content,
  });
};

const delContent = async (req: Request, res: Response) => {
  const id = req.body.id; //mongodb document id

  await ContentModel.deleteOne({
    _id: id, //delete this document only 
    userId: req.userId, //safety check
  });
  res.json({
    message: "Deleted",
  });
};

export { signUp, signIn, postContent, getContent, delContent };
