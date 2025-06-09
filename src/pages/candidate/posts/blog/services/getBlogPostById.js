import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/candidate/post/blog";
const isUseJwt = false;

export const getBlogPostById = async (id, onSuccess, onFail, onException) => {
  try {
    const fullUri = `${uri}/${id}`;

    await ApiGetRequest(fullUri, isUseJwt, onSuccess, onFail, onException);
  } catch (error) {
    console.error("Error in getBlogPostById:", error);
    onException(error);
  }
};
