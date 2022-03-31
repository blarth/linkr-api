import connection from "../../db.js";

export async function getUsersToSearchBar(name, user) {
  return connection.query(
    `

    SELECT u.id, u.name, u.image, f."followedByUserId" AS "followed" FROM users u 
    LEFT JOIN "followers" f ON f."userId" = u.id AND f."followedByUserId" = $2
    WHERE name like $1
    ORDER BY "followed"
`,
    [`${name}%`, user]
  );
}
