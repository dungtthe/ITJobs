import { ApiPostRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/post/blog/add";
const isUseJwt = true;

export const addBlogPost = async (data, onSuccess, onFail, onException) => {
  try {
    await ApiPostRequest(uri, data, isUseJwt, onSuccess, onFail, onException);
  } catch (error) {
    console.error("Error in addBlogPost:", error);
    onException(error);
  }
};
