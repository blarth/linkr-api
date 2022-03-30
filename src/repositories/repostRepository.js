import connection from "../../db.js";


export async function createRepost(postId, userId) {
    return connection.query(
      ` 
      INSERT INTO 
      shares ("postId", "userId")
      VALUES ($1, $2)
      `,
      [postId, userId]
    );
  }

  export async function getReposts(user, offset) {
    return connection.query(
      {
        text: `SELECT posts.*,"metaData".*,users.name, users.image AS "userImage","likesPosts".like, shares.id, shares."userId"
      FROM posts
      JOIN "metaData" 
      ON posts.id="metaData"."postId"
      JOIN users
      ON posts."userId"=users.id
      LEFT JOIN "likesPosts" 
      ON posts.id="likesPosts"."postId" and "likesPosts"."userId"=$1
      JOIN shares
      ON shares."postId"=posts.id
      ORDER BY posts.id DESC
      LIMIT 10
      ${offset}
       `,
        rowMode: "array",
      },
      [user.id]
    );
  }


export async function numberReposts(postId){
    return connection.query(`
    SELECT COUNT(id) AS "numberReposts", posts.id as "postID"
    FROM shares
    JOIN posts
    ON posts.postID=shares."postId"
    WHERE shares."postId"=$1 AND posts.postID=$1
    GROUP BY "numberReposts", posts.postID
    ORDER BY COUNT(id) DESC;
    `,[postId])
}