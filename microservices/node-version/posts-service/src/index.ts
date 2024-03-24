import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { v4 as uuid } from "uuid";

type Post = {
  id: string;
  title: string;
};

const posts: Post[] = [];

export const port = "8080";

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/api/posts", (_, res: Response) => {
  res.status(200).json(posts);
});

app.post("/api/posts", (req: Request, res: Response) => {
  const post: Post = { id: uuid(), title: req.body.title };
  posts.push(post);
  res.status(201).json(post);
});

export const server = app.listen(port, () =>
  console.log(`listening on port :${port}`)
);
