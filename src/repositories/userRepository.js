import connection from "../../db.js";

export async function addUser(user, passwordHash) {
  return connection.query(
    `
          INSERT INTO 
            users (name, email, password ,image) 
          VALUES ($1, $2, $3,$4)
        `,
    [user.username, user.email, passwordHash, user.image]
  );
}
