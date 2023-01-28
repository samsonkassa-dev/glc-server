import {createUser, loginUser} from "./user.service.js"
export async function httpLoginUser(req, res) {
    const { token, ...loggedinUser } = await loginUser(req.body);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 7 * 60 * 60 * 1000,
    });
    return res.status(200).json(loggedinUser);
  }

export async function httpCreateUser(req,res) {
    res.status(201).json(await createUser(req.body))
    }