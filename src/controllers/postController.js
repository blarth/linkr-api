import {
  createPost,
  getPosts,
  createMetaData,
  getLastPost,
  selectLikeRelation,
  updateLikeStatus,
  createLikeRelation,
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
  const { user } = res.locals;
  try {
    const result = await getPosts(user);

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
export async function likePost(req, res) {
  let { id, status } = req.params;
  const { user } = res.locals;

  status == "true" ? (status = true) : (status = false);

  try {
    const { rows: likeRelations } = await selectLikeRelation(id, user);
    const [likeRelation] = likeRelations;
    if (!likeRelation) {
      createLikeRelation(id, user, status);
    } else {
      await updateLikeStatus(id, user, status);
    }

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
