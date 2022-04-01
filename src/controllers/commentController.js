import { fetchComments, postComment } from "../repositories/commentRepository.js";

export async function getComments(req, res){
	try{
		const { user } = res.locals;
		const { id } = req.params;
		const { rows: comments } = await fetchComments(id, user.id)
		res.status(200).send(comments);
	}catch(error){
		console.log(error);
		res.sendStatus(500);
	}
}

export async function postComments(req, res){
	const {user} = res.locals
	const { comment } = req.body;
	const {id} = req.params;
	try{
		await postComment(id, comment, user.id);
		res.sendStatus(201);
	}catch(error){
		console.log(error);
		res.sendStatus(500);
	}
}