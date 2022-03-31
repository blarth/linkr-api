CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"image" TEXT NOT NULL
);

CREATE TABLE "posts" (
	"id" SERIAL PRIMARY KEY,
	"link" TEXT NOT NULL,
	"postText" TEXT,
	"userId" INTEGER NOT NULL REFERENCES "users"("id")
);

CREATE TABLE "hashtags" (
	"id" SERIAL PRIMARY KEY,
	"name" TEXT NOT NULL UNIQUE
);

CREATE TABLE "hashtagsPosts" (
	"id" SERIAL PRIMARY KEY,
	"hashtagId" INTEGER NOT NULL REFERENCES "hashtags"("id"),
	"postId" INTEGER NOT NULL REFERENCES "posts"("id")
);

CREATE TABLE "likesPosts" (
	"id" serial NOT NULL,
	"userId" INTEGER NOT NULL REFERENCES "users"("id"),
	"postId" INTEGER NOT NULL REFERENCES "posts"("id"),
	"like" BOOLEAN NOT NULL 
);

CREATE TABLE "sessions" (
   "id" SERIAL PRIMARY KEY,
   "token" TEXT NOT NULL UNIQUE,
   "userId" INTEGER NOT NULL REFERENCES "users"("id")
);

CREATE TABLE "metaData" (
	"id" SERIAL PRIMARY KEY,
	"postId" INTEGER NOT NULL REFERENCES "posts"("id"),
	"url"  TEXT NOT NULL,
	"title"  TEXT,
	"description"  TEXT NOT NULL,
	"image"  TEXT NOT NULL 
);

CREATE TABLE "followers"(
	"id" SERIAL PRIMARY KEY,
	"userId" INTEGER NOT NULL REFERENCES "users"("id"),
	"followedByUserId" INTEGER NOT NULL REFERENCES "users"("id")
);

CREATE TABLE "comments"(
	"id" SERIAL PRIMARY KEY,
	"postId" INTEGER NOT NULL REFERENCES "posts"("id"),
	"comment" TEXT NOT NULL,
	"userId" INTEGER NOT NULL REFERENCES "users"("id")
);

CREATE TABLE "shares"(
	"id" SERIAL PRIMARY KEY,
	"postId" INTEGER NOT NULL REFERENCES "posts"("id"),
	"userId" INTEGER NOT NULL REFERENCES "users"("id"),
	"userName" TEXT NOT NULL 
);