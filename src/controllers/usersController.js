import { verifyExistingUser } from "../repositories/authRepository.js";

export async function createUser(req, res) {
  const user = req.body;

  try {
    const existingUsers = await verifyExistingUser(user.email);
    if (existingUsers.rowCount > 0) {
      return res.sendStatus(409);
    }

    const passwordHash = bcrypt.hashSync(user.password, 10);

    await createUser(user, passwordHash);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
