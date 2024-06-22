import axios from "axios";

import {
  COMMENTS_SERVICE_BASE_URL,
  POSTS_SERVICE_BASE_URL,
  QUERY_SERVICE_BASE_URL,
  port,
  server,
} from "..";

afterAll(() => {
  server.close();
});

describe("should notify event to subscribed listeners", () => {
  // Posts
  test("should notify PostCreated event to Posts service", async () => {
    const postServiceResponse = await axios.post(POSTS_SERVICE_BASE_URL, {
      type: "PostCreated",
    });
    expect(postServiceResponse.status).toBe(200);
  });
  test("should notify CommentCreated event to Posts service", async () => {
    const commentServiceResponse = await axios.post(POSTS_SERVICE_BASE_URL, {
      type: "CommentCreated",
    });
    expect(commentServiceResponse.status).toBe(200);
  });

  // Comments
  test("should notify PostCreated event to Comments service", async () => {
    const postServiceResponse = await axios.post(COMMENTS_SERVICE_BASE_URL, {
      type: "PostCreated",
    });
    expect(postServiceResponse.status).toBe(200);
  });
  test("should notify CommentCreated event to Comments service", async () => {
    const commentServiceResponse = await axios.post(COMMENTS_SERVICE_BASE_URL, {
      type: "CommentCreated",
    });
    expect(commentServiceResponse.status).toBe(200);
  });

  // Query
  test("should notify PostCreated event to Query service", async () => {
    const postServiceResponse = await axios.post(QUERY_SERVICE_BASE_URL, {
      type: "PostCreated",
      data: {
        id: "post-id",
        title: "post title",
      },
    });
    expect(postServiceResponse.status).toBe(200);
  });
  test("should notify CommentCreated event to Query service", async () => {
    const commentServiceResponse = await axios.post(QUERY_SERVICE_BASE_URL, {
      type: "CommentCreated",
      data: {
        id: "comment-id",
        content: "comment content",
        postId: "post-id",
      },
    });
    expect(commentServiceResponse.status).toBe(200);
  });
});
