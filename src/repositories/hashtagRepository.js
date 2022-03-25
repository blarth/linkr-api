import connection from "../../db.js";

export async function getExistingHashtags(str, arr){
    return connection.query(`
        SELECT * FROM hashtags ${str}
    `,arr);
    
}

export async function insertHashtags(str, arr){
    return connection.query(`
        INSERT INTO hashtags (name)
        ${str}
        RETURNING *
    `, arr)
}