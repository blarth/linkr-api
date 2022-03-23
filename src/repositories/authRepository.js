import connection from "../../db.js";

export async function verifyExistingUser(email) {
  return connection.query("SELECT * FROM users WHERE email=$1", [email]);
}

export async function createSession(token, user) {
  return connection.query(
    'INSERT INTO sessions (token, "userId") VALUES ($1, $2)',
    [token, user.id]
  );
}
export async function deleteSession(user) {
  return connection.query('DELETE FROM sessions WHERE "userId"=$1', [user.id]);
}
