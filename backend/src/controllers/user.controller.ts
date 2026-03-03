import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { asyncHandler } from "../utils/asyncHandler.js";
import { UserModel } from "../model/users.model.js";
import { ContentModel } from "../model/content.model.js";
import { ContentSchema, resetPasswordSchema, SigninSchema, SignupSchema } from "../validator/index.js";
import { config } from "../config/config.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiRes } from "../utils/ApiResponse.js";

export const signUp = asyncHandler(async (req: Request, res: Response) => {

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

  const safeUser = await UserModel.findById(user._id).select("-password -refreshToken")

  return res.status(201).json(new ApiRes(201, "user created", safeUser));

});

export const signIn = asyncHandler(async (req: Request, res: Response) => {
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

  const access_token = jwt.sign(
    {
      id: existingUser._id,
      name: existingUser.username
    },
    config.at_jwt,
    {
      expiresIn: "15m",
    },
  );

  const refreshToken = jwt.sign({ id: existingUser._id }, config.rt_jwt, { expiresIn: "25d" })
  existingUser.refreshToken = refreshToken
  await existingUser.save()

  return res.status(201).cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: true
  }).json(new ApiRes(200, "login successfull", { access_token }));
});

export const postContent = asyncHandler(async (req: Request, res: Response) => {
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

  res.status(201).json(new ApiRes(201, "content added", content));
});

export const getContent = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.userId;

  const page = Number(req.query.page) || 1;
  const limit = 8;
  const skip = (page - 1) * limit;

  if (page < 1) {
    throw new ApiError("page number must be greater than 0", 400);
  }

  const content = await ContentModel.find({ userId })
    .populate("userId", "username")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 }); //newest first

  const total = await ContentModel.countDocuments({ userId });

  res.json(
    new ApiRes(200, "All content", {
      content,
      currentPage: page,
      totalItems: total,
    })
  );
});

export const delContent = asyncHandler(async (req: Request, res: Response) => {
  const id = req.body.id; //mongodb document id

  await ContentModel.deleteOne({
    _id: id, //delete this document only 
    userId: req.userId, //safety check
  });

  res.json(new ApiRes(200, "deleted", null));
});

export const logOut = asyncHandler(async (req: Request, res: Response) => {
  await UserModel.findByIdAndUpdate({
    id: req.userId
  }, {
    $unset: {
      refreshToken: 1
    }
  }, {
    new: true
  })

  return res.status(200).clearCookie("refresh_token", { httpOnly: true, secure: true }).json(
    new ApiRes(200, "logged out", null)
  )
})


export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const parsedData = resetPasswordSchema.safeParse(req.body)

  if (!parsedData.success) {
    throw new ApiError("INVALID_REQUEST", 400)
  }

  const { confirmPassword, newPassword, currentPassword } = parsedData.data
  const user = await UserModel.findById(req.userId)
  if (!user) {
    throw new ApiError("inavlid user", 400)
  }
  const correctCurrentPass = await bcrypt.compare(currentPassword, user?.password)

  if (!correctCurrentPass) {
    throw new ApiError("wrong password", 400)
  }
  if (newPassword !== confirmPassword) {
    throw new ApiError("password did not matched", 400)
  }
  const newHashedPass = await bcrypt.hash(newPassword, 10)
  await UserModel.findByIdAndUpdate(req.userId
    , {
      $set: {
        password: newHashedPass
      }
    }, {
    new: true
  })

  return res.status(201).json(new ApiRes(201, "password updated successfully", null))
})

export const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
  //extract refresh_token from cookies
  const incomingRefreshToken = req.cookies.refresh_token

  if (!incomingRefreshToken) {
    throw new ApiError("unauthorized request", 401);
  }

  //check if incomingRefreshToken contains the correct userId
  const decodedRefreshToken = jwt.verify(incomingRefreshToken, config.rt_jwt) as { id: string }
  const user = await UserModel.findById(decodedRefreshToken?.id)

  if (!user) {
    throw new ApiError("invalid refresh token", 400)
  }

  //compare the incomingRefreshToken and refresh_token in db
  if (incomingRefreshToken !== user.refreshToken) {
    throw new ApiError("Refresh token is expired or used", 400)
  }

  //generate new access_token and refresh_token
  const newAccess_token = jwt.sign(
    {
      id: user._id,
      name: user.username
    },
    config.at_jwt,
    {
      expiresIn: "15m",
    },
  );

  const newRefreshToken = jwt.sign({ id: user._id }, config.rt_jwt, { expiresIn: "25d" })

  user.refreshToken = newRefreshToken
  await user.save({ validateBeforeSave: false })

  return res.status(201).cookie("refresh_token", newRefreshToken, {
    httpOnly: true,
    secure: true
  }).json(new ApiRes(201, "new access_token and refresh_token generated", { newAccess_token }))

})

