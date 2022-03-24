import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import {
  verifyExistingUser,
  createSession,
  deleteSession,
} from "../repositories/authRepository.js";

export async function signin(req, res) {
  const { email, password } = req.body;
  try {
    const { rows: users } = await verifyExistingUser(email);
    const [user] = users;
    if (!user) {
      return res.sendStatus(401);
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      await createSession(token, user);
      return res.send(token);
    }

    res.sendStatus(401);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
export async function signout(req, res) {
  const { user } = res.locals;

  try {
    await deleteSession(user);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
