import axios from "axios";

import { EVENT_BUS_URL, port, server } from "..";

const BASE_URL = `http://localhost:${port}/api/posts`;

const postId = "qwerty-123456";

afterAll(() => {
  server.close();
});

describe("test comments service endpoints", () => {
  test("should create a comment in a post and return it", async () => {
    const response = await axios.post(`${BASE_URL}/${postId}/comments`, {
      content: "Comment content",
    });
    expect(response.status).toBe(201);
    const { data: comment } = response;
    expect(comment).toHaveProperty("id");
    expect(comment).toHaveProperty("content");
    expect(comment).toHaveProperty("postId", postId);
  });

  test("should return an array with one comment", async () => {
    const response = await axios.get(`${BASE_URL}/${postId}/comments`);
    expect(response.status).toBe(200);
    const { data: comments } = response;
    expect(comments.length).toBe(1);
    const comment = comments[0];
    expect(comment).toHaveProperty("id");
    expect(comment).toHaveProperty("content");
    expect(comment).toHaveProperty("postId", postId);
  });

  test("should emit a CommentCreated event", async () => {
    const response = await axios.post(EVENT_BUS_URL, {
      type: "CommentCreated",
      data: { id: "", content: "", postId: "" },
    });
    expect(response.status).toBe(201);
  });
});
