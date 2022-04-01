import connection from "../../db.js";

export async function fetchComments(postId, userId){
	return connection.query(`
		SELECT comments.*, users.name, users.image, followers."userId" as following
		FROM comments
		JOIN users ON comments."userId"=users.id
		LEFT JOIN followers ON followers."followedByUserId"=$2 AND followers."userId"=comments."userId"
		WHERE comments."postId"=$1
		ORDER BY comments.id DESC
	`, [postId, userId])
}

// export async function  getNotFollowers(name, user){
//     return connection.query(`
//     SELECT u.id, u.name, u.image FROM users u 
//     LEFT JOIN "followers" f ON f."userId" =  u.id
//     WHERE name like $1
//     GROUP BY f."followedByUserId" = $2, u.id
// `,[name, user]);
// }

export async function postComment(postId, comment, user){
    return connection.query(`
	INSERT INTO 
    "comments" ("postId", comment, "userId")
    VALUES ($1, $2, $3)
`,[postId, comment, user]);
}