import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/admin/candidate";
const isUseJwt = true;

export const getCandidateSummary = async (
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
    console.error("Error in getCandidateSummary:", error);
    onException(error);
  }
};
