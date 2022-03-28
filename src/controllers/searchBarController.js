import { getSearchBar } from "../repositories/searchBarRepository.js";

export async function searchBarUsers(req, res) {
    const { name } = req.params;
    try{
        const result = await getSearchBar(name);
        res.send(result.rows);
        return (result.rows)
    }catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
