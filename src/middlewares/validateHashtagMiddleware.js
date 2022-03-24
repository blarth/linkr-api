export default function hashtagsRegex(req, res, next){
    const {postText} = req.body

    const regexp = /#+[a-zA-Z0-9A-Za-zÀ-ÖØ-öø-ʸ(_)]{1,}/g;

    const array = [...postText.matchAll(regexp)];
    res.locals.regex = array

    next()
} 

