import axios from "axios";

import { port, server } from "..";

const BASE_URL = `http://localhost:${port}`;

afterAll(() => {
  server.close();
});

describe("test query service endpoints", () => {
  test("should add a new post after a PostCreated event", async () => {
    const response = await axios.post(`${BASE_URL}/events`, {
      type: "PostCreated",
      data: {
        id: "post-id",
        title: "post title",
      },
    });
    expect(response.status).toBe(200);
    const {
      data: { info, type, data: post },
    } = response;
    expect(info).toBe("Received event.");
    expect(type).toBe("PostCreated");
    expect(post).toHaveProperty("id", "post-id");
    expect(post).toHaveProperty("title", "post title");
  });

  test("should add a new comment after a CommentCreated event", async () => {
    const response = await axios.post(`${BASE_URL}/events`, {
      type: "CommentCreated",
      data: {
        id: "comment-id",
        content: "post comment",
        postId: "post-id",
      },
    });
    expect(response.status).toBe(200);
    const {
      data: { info, type, data: comment },
    } = response;
    expect(info).toBe("Received event.");
    expect(type).toBe("CommentCreated");
    expect(comment).toHaveProperty("id", "comment-id");
    expect(comment).toHaveProperty("content", "post comment");
    expect(comment).toHaveProperty("postId", "post-id");
  });

  test("should return an array with one post and one comment", async () => {
    const response = await axios.get(`${BASE_URL}/api/posts`);
    const { data: posts } = response;
    expect(posts).toHaveLength(1);
    const { post, comments } = posts[0];
    expect(post).toHaveProperty("id", "post-id");
    expect(post).toHaveProperty("title", "post title");
    const comment = comments[0];
    expect(comment).toHaveProperty("id", "comment-id");
    expect(comment).toHaveProperty("content", "post comment");
    expect(comment).toHaveProperty("postId", "post-id");
  });
});
