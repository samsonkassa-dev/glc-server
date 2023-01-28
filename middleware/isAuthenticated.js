import jwt from 'jsonwebtoken';
import { ErrorResponse } from '../_helpers/errorResponse.js';
import UserModel from "../users/user.model.js"

export async function isAuthenticated(req, _, next) {
  let token = req.headers.cookie && req.headers.cookie.split('=')[1];
  if (token) {
    try {
      const { id } = jwt.verify(token, process.env.SECRET_KEY);
      const currentUser = await UserModel.findOne(
        {
          _id: id,
        },
        {
          _id: 1,
          email: 1,
        }
      );
      req.user = currentUser;
      next();
    } catch (error) {
      console.error(error);
      throw new ErrorResponse('Not Authenticated', 401);
    }
  }else{
    throw new ErrorResponse('Not Authenticated, no token', 401);
  }
}