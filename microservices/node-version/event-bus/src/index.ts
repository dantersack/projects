import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import { getErrorMessage } from "./utils";

export const POSTS_SERVICE_BASE_URL = `http://localhost:8080/events`;
export const COMMENTS_SERVICE_BASE_URL = `http://localhost:8081/events`;
export const QUERY_SERVICE_BASE_URL = `http://localhost:8082/events`;

type Event = {
  type: "PostCreated" | "CommentCreated";
  data: Record<string, unknown>;
};

const events: Array<Event> = [];

export const port = "8085";

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/events", (req: Request, res: Response) => {
  res.status(200).json(events);
});

app.post("/events", (req: Request, res: Response) => {
  const event: Event = req.body;
  events.push(event);
  try {
    axios.post(POSTS_SERVICE_BASE_URL, event);
    axios.post(COMMENTS_SERVICE_BASE_URL, event);
    axios.post(QUERY_SERVICE_BASE_URL, event);
    res.status(201).json({ status: "Ok." });
  } catch (error) {
    const errMsg = getErrorMessage(error);
    console.error(errMsg);
    res.status(500).json({ error: errMsg });
  }
});

export const server = app.listen(port, () =>
  console.log(`listening on port :${port}`)
);
