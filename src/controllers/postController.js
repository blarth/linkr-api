import {
  createPost,
  getPosts,
  createMetaData,
  getLastPost,
} from "../repositories/postRepository.js";
import { postHashtag } from "../repositories/hashtagRepository.js";

export async function postLink(req, res) {
  const { link, postText } = req.body;
  const { user } = res.locals;
  const {regex} = res.locals;

  try {
    //await createPost(link, postText, user.id);
    // const { rows: lastPost } = await getLastPost(user.id);
    // await createMetaData(lastPost);
    if(regex){
      postHashtags(req.body.id, res);
    }else res.sendStatus(201);

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

async function postHashtags(id, res){
  const {regex} = res.locals;
  let str = "WHERE ";
  let firstTime = true;
  const arr= [];
  for(let i = 0 ; i < regex.length ; i++){
    if(firstTime){
      arr.push(regex[0][0]);
      str+=`name = $${arr.length}`
      firstTime = false
    }
    else{
      arr.push(regex[i][0])
      str+= ` OR name = $${arr.length}`
    }
  }
  const {rows} = await postHashtag(str, arr);
  res.send(`${rows[0].id}`).status(201);
}

export async function posts(req, res) {
  try {
    const result = await getPosts();

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
        ] = row;

        return {
          id,
          link,
          postText,
          userId,
          metadata: { url, title, description, image },
        };
      })
    );
  } catch (error) {
    console.log(error);
  }
}
