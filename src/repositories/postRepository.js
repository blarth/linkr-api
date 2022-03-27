import connection from "../../db.js";
import urlMetadata from "url-metadata";

export async function createPost(link, postText, id) {
  return connection.query(
    ` 
    INSERT INTO 
    posts (link, "postText", "userId")
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [link, postText, id]
  );
}

export async function createMetaData([post]) {
  try {
    const metadata = await urlMetadata(post.link);

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
  } catch (error) {
    console.log(error);
  }
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

export async function getPosts(user) {
  return connection.query(
    {
      text: `SELECT posts.*,"metaData".*,users.name, users.image AS "userImage","likesPosts".like
    FROM posts
    JOIN "metaData" 
    ON posts.id="metaData"."postId"
    JOIN users
    ON posts."userId"=users.id
    LEFT JOIN "likesPosts" 
    ON posts.id="likesPosts"."postId" and "likesPosts"."userId"=$1
    ORDER BY posts.id DESC
    LIMIT 20 `,
      rowMode: "array",
    },
    [user.id]
  );
}

export async function getLikes(postId) {
  return connection.query(
    `SELECT posts.id, "likesPosts".like, users.name
    FROM "likesPosts"
    LEFT JOIN users
    ON users.id="likesPosts"."userId"
    LEFT JOIN posts
    ON posts.id="likesPosts"."postId" 
    WHERE "likesPosts".like='t' AND posts.id=$1
    GROUP BY users.name, posts.id, "likesPosts".like
    `
    ,[postId]);
}

export async function createLikeRelation(id, user, status) {
  return connection.query(
    ` 
    INSERT INTO "likesPosts" ("userId","postId","like") VALUES ($1,$2,$3)
    `,
    [user.id, id, status]
  );
}

export async function selectLikeRelation(id, user) {
  return connection.query(
    `
  SELECT "likesPosts".*, posts.id FROM posts 
  JOIN "likesPosts" 
  ON posts.id="likesPosts"."postId" AND "likesPosts"."userId"=$1
  WHERE posts.id=$2`,
    [user.id, id]
  );
}

export async function updateLikeStatus(id, user, status) {
  return connection.query(
    `
  UPDATE "likesPosts"
  SET "like"=$1
  WHERE "likesPosts"."postId"=$2 AND "likesPosts"."userId"=$3
  `,
    [status, id, user.id]
  );
}

export async function getPostsById(id, user) {
  return connection.query(
    {
      text: `SELECT posts.*, "metaData".*, users.name, users.image AS "userImage","likesPosts".like
      FROM posts
      JOIN "metaData" 
      ON posts.id="metaData"."postId"
      JOIN users
      ON posts."userId"=users.id
      LEFT JOIN "likesPosts" 
      ON posts.id="likesPosts"."postId" and "likesPosts"."userId"=$1
      ORDER BY posts.id DESC
      LIMIT 20 `,
      rowMode: "array",
    },
    [id]
  );
}
export async function getPostsByHashtag(hashtag, user) {
  return connection.query(
    {
      text: `SELECT posts.*, "metaData".*, users.name, users.image AS "userImage","likesPosts".like,hashtags.id,"hashtagsPosts".id
      FROM posts
      JOIN "metaData" 
      ON posts.id="metaData"."postId"
      JOIN users
      ON posts."userId"=users.id
      JOIN "hashtagsPosts" ON "hashtagsPosts"."postId"=posts.id
      JOIN hashtags ON hashtags.id="hashtagsPosts"."hashtagId" AND hashtags.name ILIKE $1
      LEFT JOIN "likesPosts" 
      ON posts.id="likesPosts"."postId" and "likesPosts"."userId"=$2
      ORDER BY posts.id DESC
      LIMIT 20`,
      rowMode: "array",
    },
    [hashtag, user.id]
  );
}

export async function deletePost(id) {
  const deleteMetaDataById = connection.query(
    `
    DELETE FROM "metaData" WHERE "postId" = $1
  `,
    [id]
  );

  const deleteLikesPostsById = connection.query(
    `
    DELETE FROM "likesPosts" WHERE "postId" = $1
  `,
    [id]
  );

  const deleteHashtagsPostsById = connection.query(
    `
    DELETE FROM hashtagsPosts" WHERE "postId" = $1
  `,
    [id]
  );

  const deletePostById = connection.query(
    `
    DELETE FROM posts WHERE id = $1
  `,
    [id]
  );

  return{
    deleteMetaDataById,
    deletePostById,
    deleteLikesPostsById,
    deleteHashtagsPostsById
  }
}