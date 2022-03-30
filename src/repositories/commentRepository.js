import connection from "../../db.js";

export async function fetchComments(postId, offset){
	return connection.query(`
		SELECT comments.*, users.name, users.image, followers."followedByUserId" as following FROM comments
		LEFT JOIN followers ON followers."userId"=comments."userId"
		JOIN users ON comments."userId"=users.id
		WHERE comments."postId"=$1
		ORDER BY comments.id DESC
		LIMIT 10
		OFFSET $2
	`, [postId, offset])
}

export async function  getNotFollowers(name, user){
    return connection.query(`
    SELECT u.id, u.name, u.image FROM users u 
    LEFT JOIN "followers" f ON f."userId" =  u.id
    WHERE name like $1
    GROUP BY f."followedByUserId" = $2, u.id
`,[name, user]);
}