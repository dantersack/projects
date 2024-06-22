import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import { getErrorMessage } from "./utils";

export const EVENT_BUS_BASE_URL = `http://localhost:8085/events`;

type Post = {
  id: string;
  title: string;
};

type Comment = {
  id: string;
  content: string;
  postId: string;
};

type PostsWithComments = Array<{ post: Post; comments: Comment[] }>;

type PostCreatedEvent = {
  type: "PostCreated";
  data: Post;
};

type CommentCreatedEvent = {
  type: "CommentCreated";
  data: Comment;
};

type Event = PostCreatedEvent | CommentCreatedEvent;

const posts: PostsWithComments = [];

const handleEvent: (event: Event) => void | Error = ({ type, data }) => {
  switch (type) {
    case "PostCreated":
      posts.push({ post: data, comments: [] });
      break;
    case "CommentCreated":
      const postIdx = posts.findIndex((item) => item.post.id === data.postId);
      if (postIdx !== -1) {
        posts[postIdx].comments.push(data);
      }
      break;
    default: {
      throw new Error("Invalid data.");
    }
  }
};

export const port = "8082";

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/api/posts", (req: Request, res: Response) => {
  res.status(200).json(posts);
});

app.post("/events", (req: Request, res: Response) => {
  const event: Event = req.body;
  try {
    handleEvent(event);
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    console.log(errorMsg);
    res.status(400).json({ error: errorMsg });
  }
  const { type, data } = event;
  res.status(200).json({ info: "Received event.", type, data });
});

export const server = app.listen(port, async () => {
  console.log(`listening on port :${port}`);

  const { data: events }: { data: Event[] } = await axios.get(
    EVENT_BUS_BASE_URL
  );

  for (let event of events) {
    console.log("Processing event:", event.type);
    handleEvent(event);
  }
});
