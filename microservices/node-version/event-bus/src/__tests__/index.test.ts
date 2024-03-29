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
  test("should notify event to Posts service", async () => {
    const postServiceResponse = await axios.post(POSTS_SERVICE_BASE_URL, {
      type: "PostCreated",
    });
    expect(postServiceResponse.status).toBe(200);
  });

  test("should notify event to Comments service", async () => {
    const commentServiceResponse = await axios.post(COMMENTS_SERVICE_BASE_URL, {
      type: "CommentCreated",
    });
    expect(commentServiceResponse.status).toBe(200);
  });

  test("should notify event to Query service", async () => {
    const queryServiceResponse = await axios.post(QUERY_SERVICE_BASE_URL, {
      type: "???",
    });
    expect(queryServiceResponse.status).toBe(200);
  });
});
