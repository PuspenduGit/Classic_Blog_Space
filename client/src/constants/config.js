//API_NOTIFICATION_MESSAGES
export const API_NOTIFICATION_MESSAGES = {
  loading: {
    title: "Loading...",
    message: "LOading Data...",
  },
  success: {
    title: "Success",
    message: "Data Loaded Successfully",
  },
  responseFailure: {
    title: "Error",
    message: "Error occured while fetching response",
  },
  requestFailure: {
    title: "Error",
    message: "Error occured while fetching request",
  },
  networkError: {
    title: "Error",
    message: "Unable to connect to server",
  },
};

//API SERVICE CALL
//SAMPLE REQUEST
//NEED SERVICE CALL : {url: '/, method: 'POST/GET/PUT/DELETE', query: true/false, params: true/false}

export const SERVICE_URLS = {
  userSignup: { url: "/signup", method: "POST" },
  userLogin: { url: "/login", method: "POST" },
  uploadFile: {
    url: "/file/upload",
    method: "POST",
    Headers: { "Content-Type": "multipart/form-data" },
  },
  createPost: { url: "create", method: "POST" },
  getAllPosts: { url: "/posts", method: "GET", params: true },
  getPostById: { url: "post", method: "GET", query: true },
  updatePost: { url: "update", method: "PUT", query: true },
  deletePost: { url: "delete", method: "DELETE", query: true },
  createComment: { url: "/comment/new", method: "POST" },
  getAllComments: { url: "comments", method: "GET", query: true },
  deleteComment: { url: "comment/delete", method: "DELETE", query: true },
};
