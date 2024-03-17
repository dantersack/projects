import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { v4 as uuid } from "uuid";

type Post = {
  id: string;
  title: string;
};

const posts: Post[] = [];

const app: Express = express();

app.use(bodyParser.json());

app.get("/api/posts", (_, res: Response) => {
  res.status(200).json(posts);
});

app.post("/api/posts", (req: Request, res: Response) => {
  const post: Post = { id: uuid(), title: req.body.title };
  posts.push(post);
  res.status(201).json(posts);
});

app.listen("8080", () => console.log("listening on port :8080"));
