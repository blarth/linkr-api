# Linkr ⛓️
## Share and tag links!

### :computer: Tech used
<p>
	<img src="https://img.shields.io/badge/shell_script-%23121011.svg?style=for-the-badge&logo=gnu-bash&logoColor=white"/>
	<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"/>
	<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>
	<img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
	<img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"/>

</p>

## Overview
This is the API with which the [Linktr App](https://github.com/blarth/linktr-react) interacts.

## :hammer_and_wrench: Installation
### Make sure you have the following tools installed before you begin:
<p>
	<a href="https://git-scm.com/"><img src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white"/></a>
	<a href="https://www.npmjs.com/package/npm"><img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"/></a>
	<a href="https://nodejs.org"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/></a>
	<a href="https://www.postgresql.org/download/"><img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"/></a>
</p>
<p>Not needed but recommended: <a href="https://code.visualstudio.com/">VSCode</a></p>

#### This API was designed to work with  [Linktr App](https://github.com/blarth/linktr-react) 

Use a terminal interface such as bash or zsh, and enter the following:
```bash
#download
gh repo clone blarth/linktr-api

#access the folder you downloaded it to
cd linktr-api

#install dependencies
npm i
```
The app will run locally and you must configure a ```.env``` file with a port of your choosing. The default one is 3000.

## :gear:Running
```bash
#you can run the server with
npm run dev
```
In another terminal instance, run the db
```bash
#you can start the db with
psql
```

## :scroll:Documentation

### All requests are HTTP based

#### ```POST /signup, /signin, DELETE /signout```

Authenticating related routes. Send requests of the respective types with the following:

To signup:

{

	email: any email,
	password: no restrictions, it will be stored encrypted,
	username: name with which the user will be identified,
	image: link to an image file, it will be shown as the user's avatar, supported extensions are png, jpg, jpeg, jfif, gif

}

To signin:

{

	email: email used to signup,
	password: password chosen upon signup

}

The server will respond with a token, to be used on every other route where authetication is required. Use in the headers of your requests as:

{

	Authorization: Bearer <GIVEN_TOKEN>

}

To signout, simply send the request with a header containing the Authorization key above.

#### ```GET /timeline, /hashtags, POST /timeline```

Routes without params.

With the auth header, send the request to timeline to get all posts from all users, most recent first, and hashtags, to get the trending hashtags, ten most used first. To post a link, send request to timeline, as a logged user, with the following:

{

	link: the link you want to share,
	postText: the text to give it context, you can post hashtags by using # before a word.

}

Resquests with params:
#### ```PUT /posts/:id/:status```

Send a request with the post id and the current status it has, liked or not. The server will like the post or remove it, adding or removing your user from the list of people who liked it.

#### ```GET /posts/hashtags/:name```

Get all posts containing the <:NAME> hashtag (without the #)

#### ```GET /posts/user/:name```

Get all posts from user <:NAME>

#### ```DELETE /deletepost/:id```

As a logged user and publisher of the post, send the request to delete it, with the id given.

#### ```PATCH /posts/edit/:id```

As a logged user and publisher of the post, you can edit it by sending a request with it's id. Any hashtags removed will lose a score in the trending ranking, any added will gain a score, and remaining ones are unaltered.

#### ```GET /likes/:id```

Get all likes from post with id <:ID>
### :man_technologist: Authors
<p>Made with care by</p>
<a href="https://github.com/blarth"><img  style="border-radius: 50%;"  src="https://avatars.githubusercontent.com/u/79117658?v=4"  width="100px;"  alt="João Marcos Inocente"/></a>

[![Gmail Badge](https://img.shields.io/badge/-jminocente@gmail.com-c14438?style=flat&logo=Gmail&logoColor=white&link=mailto:jminocente@gmail.com)](mailto:jminocente@gmail.com)

[![Linkedin Badge](https://img.shields.io/badge/-João-Inocente?style=flat&logo=Linkedin&logoColor=white&color=blue&link=https://www.linkedin.com/in/joão-marcos-inocente-pavão-899961142/)](https://www.linkedin.com/in/joão-marcos-inocente-pavão-899961142/)

<a href="https://github.com/fMagVen"><img  style="border-radius: 50%;"  src="https://avatars.githubusercontent.com/u/78576546?v=4"  width="100px;"  alt="Felipe Ventura"/></a>

[![Gmail Badge](https://img.shields.io/badge/-fmagven93@gmail.com-c14438?style=flat&logo=Gmail&logoColor=white&link=mailto:fmagven93@gmail.com)](mailto:fmagven93@gmail.com)

[![Linkedin Badge](https://img.shields.io/badge/-Felipe-Ventura?style=flat&logo=Linkedin&logoColor=white&color=blue&link=https://www.linkedin.com/in/fmagven/)](https://www.linkedin.com/in/fmagven/)

<a href="https://github.com/rayyventura"><img  style="border-radius: 50%;"  src="https://avatars.githubusercontent.com/u/89822434?v=4"  width="100px;"  alt="Rayane Ventura"/></a>

[![Gmail Badge](https://img.shields.io/badge/-rayyventura@gmail.com-c14438?style=flat&logo=Gmail&logoColor=white&link=mailto:rayyventura@gmail.com)](mailto:rayyventura@gmail.com)

[![Linkedin Badge](https://img.shields.io/badge/-Rayane-Ventura?style=flat&logo=Linkedin&logoColor=white&color=blue&link=http://www.linkedin.com/in/rayane-ventura27)](http://www.linkedin.com/in/rayane-ventura27/)

<a href="https://github.com/lucasvz"><img  style="border-radius: 50%;"  src="https://avatars.githubusercontent.com/u/49080941?v=4"  width="100px;"  alt="Lucas Tadeu"/></a>

[![Gmail Badge](https://img.shields.io/badge/-lucastadeuvaz@gmail.com-c14438?style=flat&logo=Gmail&logoColor=white&link=mailto:lucastadeuvaz@gmail.com)](mailto:lucastadeuvaz@gmail.com)

[![Linkedin Badge](https://img.shields.io/badge/-Lucas-Tadeu?style=flat&logo=Linkedin&logoColor=white&color=blue&link=https://www.linkedin.com/in/lucas-tadeu-vaz-90186b20b/)](https://www.linkedin.com/in/lucas-tadeu-vaz-90186b20b/)

<p>Contact us anytime!</p>
