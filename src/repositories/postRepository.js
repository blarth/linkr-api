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
//LEFT JOIN shares ON shares."postId"=posts.id

export async function getPosts(user, offset) {
  return connection.query(
    {
      text: `
      SELECT * FROM (
        SELECT
          pt.*,
          mt."postId", mt.url, mt.title, mt.description, mt.image,
          null as userNameRepost,
          null as userIdRepost,
          upost.name as userNamePost,
          upost.id as userNamePostId,
          upost.image as "userImage",
          "likesPosts".like,
          ( select Count(*) from shares where    shares."postId" = pt.id) as "numberReposts"
        from
        posts pt
            join "metaData" mt on
                    pt.id = mt."postId"
            join users upost on
                    upost.id = pt."userId"
            LEFT JOIN "likesPosts" ON pt.id = "likesPosts"."postId" AND "likesPosts"."userId"= $1
                where
                    pt."userId" in (
                    select
                        "userId"
                    from
                        followers f
                    where
                        f."followedByUserId" = $1
                )
        UNION ALL
        SELECT
          pt.*,
          mt."postId", mt.url, mt.title, mt.description, mt.image,
          uRepost.name as userNameRepost,
          uRepost.id as userIdRepost,
          upost.name as userNamePost,
          upost.id as userNamePostId,
          upost.image as "userImage",
          "likesPosts".like,
          ( select Count(*) from shares where    shares."postId" = s."postId") as "numberReposts"
      from
          shares s
      join posts pt on
          pt.id = s."postId"
      join users uRepost
          on
          uRepost.id = s."userId"
      join users upost
          on
          upost.id = pt."userId"
      join "metaData" mt on
          s."postId" = mt."postId"
      LEFT JOIN "likesPosts" ON s."postId" = "likesPosts"."postId" AND "likesPosts"."userId"= $1
      where
          s."userId" in (
          select
              "userId"
          from
              followers f
          where
              f."followedByUserId" = $1
      )
      ) "mainTable"
      ORDER BY "mainTable"."id" DESC
      LIMIT 10
      ${offset}  
    
     `,
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
    `,
    [postId]
  );
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

export async function getPostsById(userId, id) {
  return connection.query(
    {
      text: ` SELECT * FROM (
        SELECT
          pt.*,
          mt."postId", mt.url, mt.title, mt.description, mt.image,
          null as userNameRepost,
          null as userIdRepost,
          upost.name as userNamePost,
          upost.id as userNamePostId,
          upost.image as "userImage",
          "likesPosts".like,
          ( select Count(*) from shares where    shares."postId" = pt.id) as "numberReposts"
        from
        posts pt
            join "metaData" mt on
                    pt.id = mt."postId"
            join users upost on
                    upost.id = pt."userId"
            LEFT JOIN "likesPosts" ON pt.id = "likesPosts"."postId" AND "likesPosts"."userId"= $1
                WHERE upost.id=$2
        UNION ALL
        SELECT
          pt.*,
          mt."postId", mt.url, mt.title, mt.description, mt.image,
          uRepost.name as userNameRepost,
          uRepost.id as userIdRepost,
          upost.name as userNamePost,
          upost.id as userNamePostId,
          upost.image as "userImage",
          "likesPosts".like,
          ( select Count(*) from shares where    shares."postId" = s."postId") as "numberReposts"
      from
          shares s
      join posts pt on
          pt.id = s."postId"
      join users uRepost
          on
          uRepost.id = s."userId"
      join users upost
          on
          upost.id = pt."userId"
      join "metaData" mt on
          s."postId" = mt."postId"
      LEFT JOIN "likesPosts" ON s."postId" = "likesPosts"."postId" AND "likesPosts"."userId"= $1
      WHERE uRepost.id=$2
      ) "mainTable"
      ORDER BY "mainTable"."id" DESC
     `,
      rowMode: "array",
    },
    [userId, id]
  );
}

export async function getPostsByHashtag(hashtag, user) {
  return connection.query(
    {
      text: `SELECT posts.*, "metaData".*, users.name, users.image AS "userImage","likesPosts".like,hashtags.id,"hashtagsPosts".id, (SELECT Count(*) FROM shares WHERE shares."postId" = posts.id) AS "numberReposts"
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

export async function editPostText(txt, id) {
  return connection.query(
    `
      UPDATE "posts"
      SET "postText" = $1
      WHERE "id" = $2
  `,
    [txt, id]
  );
}

export async function verifyPostOwner(userId, postId) {
  return connection.query(
    `
    SELECT * FROM "posts"
    WHERE "userId" = $1
    AND id = $2
  `,
    [userId, postId]
  );
}

export async function deleteMetaData(id) {
  return connection.query(
    `
    DELETE FROM "metaData" WHERE "postId" = $1
  `,
    [id]
  );
}

export async function deleteHashtagsPost(id) {
  return connection.query(
    `
    DELETE FROM "hashtagsPosts" WHERE "postId" = $1
  `,
    [id]
  );
}

export async function deleteLikesPost(id) {
  return connection.query(
    `
    DELETE FROM "likesPosts" WHERE "postId" = $1
  `,
    [id]
  );
}
export async function deleteShare(id) {
  return connection.query(
    `
    DELETE FROM shares WHERE "postId" = $1
  `,
    [id]
  );
}

export async function deletePost(id) {
  return connection.query(
    `
    DELETE FROM posts WHERE id = $1
  `,
    [id]
  );
}
