import connection from "../../db.js";


export async function createRepost(postId, userId) {
    return connection.query(
      ` 
      INSERT INTO 
      shares ("postId", "userId", "userName")
      VALUES ($1, $2, (SELECT users.name from users where users.id=$2))
      `,
      [postId, userId]
    );
  }

  export async function verifyRepost(postId, userId){
    return connection.query(
      ` 
      SELECT *
      FROM 
      shares 
      WHERE "postId"=$1 AND "userId"=$2
      `,
      [postId, userId]
    );
  }
  export async function deleteRepost(postId, userId){
    return connection.query(
      ` 
      DELETE  
      FROM shares 
      WHERE "postId"=$1 AND "userId"=$2
      `,
      [postId, userId]
    );
  }



export async function numberReposts([postId]){
    return connection.query(`
    SELECT COUNT(*) AS "numberReposts",
    FROM shares
    WHERE shares."postId"=$1
    GROUP BY "numberReposts"
    `,[postId])
}