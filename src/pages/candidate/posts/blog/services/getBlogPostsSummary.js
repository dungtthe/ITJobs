import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/candidate/post/blog";
const isUseJwt = false;

export const getBlogPostsSummary = async (
  pageNumber = 1,
  pageSize = 10,
  searchTerm = "",
  onSuccess,
  onFail,
  onException
) => {
  try {
    const queryParams = new URLSearchParams({
      pageNumber: pageNumber,
      pageSize: pageSize,
    });

    if (searchTerm) {
      queryParams.append("searchTerm", searchTerm);
    }

    const fullUri = `${uri}?${queryParams.toString()}`;

    await ApiGetRequest(fullUri, isUseJwt, onSuccess, onFail, onException);
  } catch (error) {
    console.error("Error in getBlogPostsSummary:", error);
    onException(error);
  }
};
