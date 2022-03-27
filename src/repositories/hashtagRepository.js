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

export async function insertHashtagsLinksMiddleTable(str, arr){
    return connection.query(`
        INSERT INTO "hashtagsPosts" ("hashtagId", "postId")
        ${str}
    `, arr)
}

export async function getPreviousHashtags(id){
    return connection.query(`
        SELECT "hashtagId", name
        FROM "hashtagsPosts"
        JOIN hashtags ON "hashtagsPosts"."hashtagId"=hashtags.id
        WHERE "hashtagsPosts"."postId"=$1
    `,[id])
}

export async function deleteHashtagsFromMiddleTable(str, arr, id){
    return connection.query(`
        DELETE FROM "hashtagsPosts"
        WHERE "hashtagId" IN ${str}
        AND "postId" IN ($${arr.length + 1})
    `, [...arr, id])
}

export async function fetchTendingHashtags(){
	return connection.query(`
	SELECT COUNT("hashtagId") as uses, name
    FROM "hashtagsPosts"
	JOIN hashtags ON "hashtagId"=hashtags.id
	GROUP BY name
    ORDER BY uses DESC
	LIMIT 10
	`)
}