import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/candidate/post/job/apply-history";
const isUseJwt = true;

export const getJobApplicationHistories = async (
  pageNumber = 1,
  pageSize = 10,
  searchTerm = "",
  onSuccess,
  onFail,
  onException
) => {
  const queryParams = new URLSearchParams({
    pageNumber: pageNumber,
    pageSize: pageSize,
  });
  if (searchTerm) {
    queryParams.append("searchTerm", searchTerm);
  }
  const fullUri = `${uri}?${queryParams.toString()}`;
  await ApiGetRequest(fullUri, isUseJwt, onSuccess, onFail, onException);
};
