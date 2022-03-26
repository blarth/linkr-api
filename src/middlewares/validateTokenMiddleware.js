import connection from "../../db.js";
import { getSession, getUserSession } from "../repositories/authRepository.js";

export async function validateTokenMiddleware(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }

  const { rows: sessions } = await getSession(token);
  const [session] = sessions;
  if (!session) {
    return res.sendStatus(401);
  }

  const { rows: users } = await getUserSession(session);
  const [user] = users;
  if (!user) {
    return res.sendStatus(401);
  }

  res.locals.user = user;
  next();
}
