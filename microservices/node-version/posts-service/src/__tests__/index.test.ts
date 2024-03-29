import axios from "axios";

import { port, server } from "..";

const BASE_URL = `http://localhost:${port}/api/posts`;
const EVENT_BUS_URL = `http://localhost:8085/events`;

afterAll(() => {
  server.close();
});

describe("test posts service endpoints", () => {
  test("should create a new post and return it", async () => {
    const response = await axios.post(BASE_URL, {
      title: "first post",
    });
    expect(response.status).toBe(201);
    const { data: post } = response;
    expect(post).toHaveProperty("id");
    expect(post).toHaveProperty("title", "first post");
  });

  test("should return an array with one post", async () => {
    const response = await axios.get(BASE_URL);
    expect(response.status).toBe(200);
    const { data: posts } = response;
    expect(posts.length).toBe(1);
    const post = posts[0];
    expect(post).toHaveProperty("id");
    expect(post).toHaveProperty("title", "first post");
  });

  test("should emit a 'PostCreated' event", async () => {
    const response = await axios.post(EVENT_BUS_URL, {
      type: "PostCreated",
      data: { id: "foo", title: "bar" },
    });
    expect(response.status).toBe(201);
  });
});
