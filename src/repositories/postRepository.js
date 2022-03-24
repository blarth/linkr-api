import connection from "../../db.js";
import urlMetadata from "url-metadata";

export async function createPost(link, postText, id) {
  return connection.query(
    ` 
    INSERT INTO 
    posts (link, "postText", "userId")
    VALUES ($1, $2, $3)
    `,
    [link, postText, id]
  );
}

export async function createMetaData([post]) {
  urlMetadata(post.link).then(
    function (metadata) {
      return connection.query(
        `
    INSERT INTO
    "metaData" ("postId", url, title, description, image)
    VALUES ($1, $2, $3, $4, $5)
    `,
        [
          post.id,
          metadata.url,
          metadata.title,
          metadata.description,
          metadata.image,
        ]
      );
    },
    function (error) {
      console.log(error);
    }
  );
}

export async function getLastPost(id) {
  return connection.query(
    `SELECT *
      FROM posts
      WHERE posts."userId"=$1
      ORDER BY posts.id DESC
      LIMIT 1`,
    [id]
  );
}

export async function getPosts() {
  return connection.query({
    text: `SELECT posts.*, "metaData".*, users.name, users.image AS "userImage"
      FROM posts
      JOIN "metaData" 
      ON posts.id="metaData"."postId"
      JOIN users
      ON posts."userId"=users.id
      ORDER BY posts.id DESC
      LIMIT 20 `,
    rowMode: "array",
  });
}
