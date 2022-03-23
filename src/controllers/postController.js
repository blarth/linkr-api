import connection from "../../db.js";

export async function postLink(req, res) {
  const {link, postText} = req.body;
  const { user } = res.locals
  console.log(user);
  try {
        await connection.query(`
        INSERT INTO 
          posts (link, "postText", "userId")
          VALUES ($1, $2, $3)
      `, [link, postText, user.id]);


    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
