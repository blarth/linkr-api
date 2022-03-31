
import { createRepost, deleteRepost, verifyRepost } from "../repositories/repostRepository.js";

export async function reposts(req, res) {
    const { user } = res.locals;
    const {offset} = req.params;
    const offsetString = `OFFSET ${offset}`
    try {
      const result = await getReposts(user, offsetString);
      
      
      res.send(
        result.rows.map(async (row) => {
          const {rows : numberReposts} = await numberReposts(row.id)
          
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
            repostId,
            respostUserId
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
            repostId,
            respostUserId,
          };
        })
      );
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }

  export async function createReposts(req, res){
    const {user} = res.locals
    const {id} = req.params
  
    try {
        const {rows : [verifyAlreadyRepost]} = await verifyRepost(id, user.id)
        if(verifyAlreadyRepost){
            await deleteRepost(id, user.id)
            return res.sendStatus(200)
        }
      await createRepost(id, user.id)
      res.sendStatus(201)
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  
  }


  export async function verifyAlreadyRepost(req, res){
    const {user} = res.locals
    const {id} = req.params

    try {
        const {rows : [verifyAlreadyRepost]} = await verifyRepost(id, user.id)
        if(verifyAlreadyRepost){
            return res.send(true)

        }
        res.send(false)
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
  }
  
  /* export async function getNumberReposts(req, res){
    const {id} = req.params
    try {
      const {rows : numberReposts} = await numberReposts(id)
      console.log(numberReposts)
      res.sendStatus(200)
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  } */