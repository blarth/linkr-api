import connection from "../../db.js";

export async function getSearchBar(name){
    return connection.query(`
        SELECT id, name, image FROM users WHERE name like $1
    `,[`${name}%`]);
}