import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { getErrorMessage } from "./utils";

export const EVENT_BUS_URL = "http://localhost:8085/events";

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

app.post("/api/posts/:id/comments", async (req: Request, res: Response) => {
  try {
    const postId: string = req.params.id;
    const comment: Comment = { id: uuid(), content: req.body.content, postId };
    comments.push(comment);
    /**
     * Each event will have two properties:
     *  - a 'type' property (e.g. CommentCreated)
     *  - a 'data' property (e.g. { id: 'some-id', title: 'some title' })
     */
    await axios.post(EVENT_BUS_URL, {
      type: "CommentCreated",
      data: {
        id: comment.id,
        content: comment.content,
        postId: comment.postId,
      },
    });
    res.status(201).json(comment);
  } catch (error) {
    const errMsg = getErrorMessage(error);
    console.error(errMsg);
    res.status(500).json({ error: errMsg });
  }
});

app.post("/events", (req: Request, res: Response) => {
  const eventType = req.body.type;
  console.log("Received event:", eventType);
  res.status(200).json({ info: "Received event.", type: eventType });
});

export const server = app.listen(port, () =>
  console.log(`listening on port :${port}`)
);
