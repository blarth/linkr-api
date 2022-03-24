import connection from "../../db.js";

export async function validateTokenMiddleware(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }

  const { rows: sessions } = await connection.query(
    `SELECT * FROM sessions WHERE token=$1`,
    [token]
  );
  const [session] = sessions;
  if (!session) {
    return res.sendStatus(401);
  }

  const { rows: users } = await connection.query(
    `SELECT * FROM users WHERE id=$1`,
    [session.userId]
  );
  const [user] = users;
  if (!user) {
    return res.sendStatus(401);
  }

  res.locals.user = user;
  next();
}
