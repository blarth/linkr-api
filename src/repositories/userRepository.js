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

export async function followUserById(idFollowed, idFollower) {
  return connection.query(
    ` 
  INSERT INTO followers("userId","followedByUserId") VALUES($1,$2)
  `,
    [idFollowed, idFollower]
  );
}
export async function unfollowUser(idFollowed, idFollower) {
  return connection.query(
    ` 
  DELETE FROM followers WHERE "userId"=$1 AND "followedByUserId"=$2
  `,
    [idFollowed, idFollower]
  );
}

export async function verifyFollower(idFollowed, idFollower) {
  return connection.query(
    `
  SELECT id FROM followers WHERE "userId"=$1 AND "followedByUserId"=$2
  `,
    [idFollowed, idFollower]
  );
}
