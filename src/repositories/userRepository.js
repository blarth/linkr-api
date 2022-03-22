import connection from "../../db";

export async function createUser(user, passwordHash) {
  return connection.query(
    `
          INSERT INTO 
            users(name, email, password) 
          VALUES ($1, $2, $3)
        `,
    [user.name, user.email, passwordHash]
  );
}
