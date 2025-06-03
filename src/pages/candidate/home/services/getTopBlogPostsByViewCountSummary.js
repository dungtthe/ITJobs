import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/candidate/post/top-blog";
const isUseJwt = false;

export const getTopBlogPostsByViewCountSummary = async (
  size,
  onSuccess,
  onFail,
  onException
) => {
  try {
    await ApiGetRequest(
      uri + "?pageSize=" + size,
      isUseJwt,
      onSuccess,
      onFail,
      onException
    );
  } catch (error) {
    console.error("Error in getTopBlogPostsByViewCountSummary:", error);
    onException(error);
  }
};
