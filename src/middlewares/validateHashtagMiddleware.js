export default function hashtagsRegex(req, res, next){
    const {postText} = req.body

    const regexp = /#+[a-zA-Z0-9A-Za-zÀ-ÖØ-öø-ʸ(_)]{1,}/g;

    const array = [...postText.matchAll(regexp)];

    for(let i = 0; i < array.length; i++){
        array[i] = array[i][0]
    }

    res.locals.regex = array

    next()
} 

