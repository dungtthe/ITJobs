import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/admin/post/blog";
const isUseJwt = true;

export const getBlogPostsSummary = async (
  pageNumber = 1,
  pageSize = 10,
  searchTerm = "",
  userId = "",
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
    if (userId) {
      queryParams.append("userId", userId);
    }

    const fullUri = `${uri}?${queryParams.toString()}`;

    await ApiGetRequest(fullUri, isUseJwt, onSuccess, onFail, onException);
  } catch (error) {
    console.error("Error in getBlogPostsSummar:", error);
    onException(error);
  }
};
