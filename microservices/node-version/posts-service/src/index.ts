import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { getErrorMessage } from "./utils";

export const EVENT_BUS_URL = "http://localhost:8085/events";

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

app.post("/api/posts", async (req: Request, res: Response) => {
  try {
    const post: Post = { id: uuid(), title: req.body.title };
    posts.push(post);
    /**
     * Each event will have two properties:
     *  - a 'type' property (e.g. PostCreated)
     *  - a 'data' property (e.g. { id: 'some-id', title: 'some title' })
     */
    await axios.post(EVENT_BUS_URL, {
      type: "PostCreated",
      data: { id: post.id, title: post.title },
    });
    res.status(201).json(post);
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
