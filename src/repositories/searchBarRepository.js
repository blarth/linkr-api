import connection from "../../db.js";

export async function  getUsersToSearchBar(name){
    return connection.query(`
    SELECT u.id, u.name, u.image, f."followedByUserId" AS "followed" FROM users u 
    LEFT JOIN "followers" f ON f."userId" =  u.id
    WHERE name like $1
`,[`${name}%`]);
}