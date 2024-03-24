// Mock queries from the client
import axios from "axios";

const POSTS_SERVICE_BASE_URL = `http://localhost:8080/api/posts`;
const COMMENTS_SERVICE_BASE_URL = (postId: string) =>
  `http://localhost:8081/api/posts/${postId}/comments`;

const createPost = async (title: string) => {
  try {
    const response = await axios.post(POSTS_SERVICE_BASE_URL, {
      title,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getPosts = async () => {
  try {
    const response = await axios.get(POSTS_SERVICE_BASE_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const createComment = async (content: string, postId: string) => {
  try {
    const response = await axios.post(COMMENTS_SERVICE_BASE_URL(postId), {
      content,
      postId,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getComments = async (postId: string) => {
  try {
    const response = await axios.get(COMMENTS_SERVICE_BASE_URL(postId));
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const main = async () => {
  const dbzPost = await createPost("DBZ Blog Post");
  const opPost = await createPost("One Piece Blog Post");
  const posts = await getPosts();
  // console.log(posts);
  const comment1 = await createComment(
    "Gohan from the future rocks",
    dbzPost.id
  );
  const comment2 = await createComment("Zoro is always lost", opPost.id);
  const comment3 = await createComment("Mr. Satan is funny :D", dbzPost.id);
  // console.log(comment1);
  // console.log(comment2);
  // console.log(comment3);
  const dbzPostComments = await getComments(dbzPost.id);
  const opPostComments = await getComments(opPost.id);
  console.log("------------------------------------------------\n");
  console.log("Post:", posts[0].title);
  dbzPostComments.forEach(
    (comment: { id: string; content: string; postId: string }) => {
      console.log("    Comment:", comment.content);
    }
  );
  console.log("\n------------------------------------------------\n");
  console.log("Post:", posts[1].title);
  opPostComments.forEach(
    (comment: { id: string; content: string; postId: string }) => {
      console.log("    Comment:", comment.content);
    }
  );
  console.log("\n------------------------------------------------\n");
};

main();
