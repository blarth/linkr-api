import { fetchTendingHashtags } from '../repositories/hashtagRepository.js';

export async function getTrendingHashtags(_, res){
	try{
		const { rows: hashtags } = await fetchTendingHashtags()
		res.status(200).send(hashtags)
	}catch(error){
		console.log(error)
		res.sendStatus(500)
	}
}