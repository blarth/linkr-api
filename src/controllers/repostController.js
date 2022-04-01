
import { createRepost, deleteRepost, verifyRepost } from "../repositories/repostRepository.js";


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
  