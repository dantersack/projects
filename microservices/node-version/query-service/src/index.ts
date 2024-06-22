import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

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

export const port = "8082";

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/api/posts", (req: Request, res: Response) => {
  res.status(200).json(posts);
});

app.post("/events", (req: Request, res: Response) => {
  const { type, data }: Event = req.body;
  switch (type) {
    case "PostCreated":
      posts.push({ post: data, comments: [] });
      res.status(200).json({ info: "Received event.", type, data });
      break;
    case "CommentCreated":
      const postIdx = posts.findIndex((item) => item.post.id === data.postId);
      if (postIdx !== -1) {
        posts[postIdx].comments.push(data);
      }
      res.status(200).json({ info: "Received event.", type, data });
      break;
    default: {
      const error = new Error("Invalid data.");
      console.log(error.message);
      res.status(400).json({ error: error.message });
      break;
    }
  }
});

export const server = app.listen(port, () =>
  console.log(`listening on port :${port}`)
);
