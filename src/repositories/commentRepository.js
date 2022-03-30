import connection from "../../db.js";

export async function fetchComments(postId, offset){
	return connection.query(`
		SELECT comments.*, users.name, users.image FROM comments
		JOIN users ON comments."userId"=users.id
		WHERE comments."postId"=$1
		ORDER BY comments.id DESC
		LIMIT 10
		OFFSET $2
	`, [postId, offset])
}