import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/candidate/post/random-blog";
const isUseJwt = false;

export const getRandomBlogPostsSummary = async (
  excludeId,
  count,
  onSuccess,
  onFail,
  onException
) => {
  try {
    console.log(excludeId);
    const fullUri = `${uri}?excludeId=${excludeId}&count=${count}`;

    await ApiGetRequest(fullUri, isUseJwt, onSuccess, onFail, onException);
  } catch (error) {
    console.error("Error in getRandomBlogPostsSummary:", error);
    onException(error);
  }
};
