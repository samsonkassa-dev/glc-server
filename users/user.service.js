import { ErrorResponse } from "../_helpers/errorResponse.js";
import { generateJWT } from "../_helpers/generateJWT.js";
import {
  generatePasswordHash,
  validatePassword,
} from "../_helpers/hashPassword.js";
import UserModel from "./user.model.js";

export async function createUser(userInfo) {
  const { email, password:pwd } = userInfo;
  if (
    !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  )
    throw new ErrorResponse("Please enter a valid email", 400);
  const user = await UserModel.findOne({ email });
  if (user) throw new ErrorResponse("Email already in Use", 400);
  if (!/^ *$/.test(pwd) && pwd.length < 8)
    throw new ErrorResponse("Password must have at least 8 characters", 400);
  const password = await generatePasswordHash(pwd);
  return UserModel.create({ email, password });
}

export async function loginUser(userInfo) {
  const { email, password } = userInfo;
  const user = await UserModel.findOne({ email });
  if (!user) throw new ErrorResponse("Invalid Credentials", 403);
  const matchPassword = await validatePassword(password, user.password);
  if (!matchPassword) throw new ErrorResponse("Invalid Credentials", 403);
  const token = await generateJWT(user._id);
  const { password: pyd, ...usr } = user._doc;
  return {
    ...usr,
    token,
 };
}
