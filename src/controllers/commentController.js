import { fetchComments } from "../repositories/commentRepository.js";

export async function getComments(req, res){
	try{
		const postId = req.params.id;
		const offset = req.params.offset;
		const user = res.locals.user;
		const { rows: comments } = await fetchComments(postId, offset)
		res.status(200).send(comments);
	}catch(error){
		console.log(error);
		res.sendStatus(500);
	}
}