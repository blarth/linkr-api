import connection from "../../db.js";

export async function postHashtag(str, arr){
    return connection.query(`
        SELECT * FROM hashtags ${str}
    `,arr);
    
} 