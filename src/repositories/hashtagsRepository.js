import connection from "../../db.js";

export async function fetchTendingHashtags(_, res){
	return connection.query(`
	SELECT COUNT("hashtagId") as uses, name FROM "hashtagsPosts"
	JOIN hashtags ON "hashtagId"=hashtags.id
	GROUP BY name
	LIMIT 10
	`)
}