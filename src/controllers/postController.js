import {
  createPost,
  getPosts,
  createMetaData,
  getLastPost,
} from "../repositories/postRepository.js";

export async function postLink(req, res) {
  const { link, postText } = req.body;
  const { user } = res.locals;
  const { regex } = res.locals;

  try {
    await createPost(link, postText, user.id);
    const { rows: lastPost } = await getLastPost(user.id);
    await createMetaData(lastPost);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function posts(req, res) {
  try {
    const result = await getPosts();
    console.log(result);

    res.send(
      result.rows.map((row) => {
        const [
          id,
          link,
          postText,
          userId,
          metaId,
          postId,
          url,
          title,
          description,
          image,
          userName,
          userImage,
          isLike,
        ] = row;

        return {
          id,
          link,
          postText,
          postId,
          userId,
          metadata: { url, title, description, image },
          userName,
          userImage,
          isLike: isLike,
        };
      })
    );
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
