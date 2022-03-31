import { getUsersToSearchBar } from "../repositories/searchBarRepository.js";

export async function getSearchBar(req, res) {
    const { name } = req.params;
    const { user } = res.locals;
    try{
        const result = await getUsersToSearchBar(name, user.id);
        res.send(result.rows);
        return (result.rows)
    }catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
