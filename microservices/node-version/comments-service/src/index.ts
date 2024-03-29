import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { v4 as uuid } from "uuid";

type Comment = {
  id: string;
  content: string;
  postId: string;
};

const comments: Comment[] = [];

export const port = "8081";

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/api/posts/:id/comments", (req: Request, res: Response) => {
  const postId: string = req.params.id;
  const postComments: Comment[] = comments.filter((c) => c.postId === postId);
  res.status(200).json(postComments);
});

app.post("/api/posts/:id/comments", (req: Request, res: Response) => {
  const postId: string = req.params.id;
  const comment: Comment = { id: uuid(), content: req.body.content, postId };
  comments.push(comment);
  res.status(201).json(comment);
});

export const server = app.listen(port, () =>
  console.log(`listening on port :${port}`)
);
