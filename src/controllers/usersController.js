import { verifyExistingUser } from "../repositories/authRepository.js";
import { addUser } from "../repositories/userRepository.js";
import bcrypt from "bcrypt";

export async function createUser(req, res) {
  const user = req.body;
  try {
    const existingUsers = await verifyExistingUser(user.email);
    if (existingUsers.rowCount > 0) {
      return res.sendStatus(409);
    }

    const passwordHash = bcrypt.hashSync(user.password, 10);

    await addUser(user, passwordHash);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getUser(req, res) {
  const { user } = res.locals;

  res.send({ id: user.id, image: user.image });
}
