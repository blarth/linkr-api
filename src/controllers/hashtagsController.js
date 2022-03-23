import { fetchTendingHashtags } from '../repositories/hashtagsRepository.js';

export async function getTrendingHashtags(_, res){
	try{
		const { rows } = await fetchTendingHashtags()
		const [hashtags] = rows
		res.status(200).send(hashtags)
	}catch(error){
		console.log(error)
		res.sendStatus(500)
	}
}