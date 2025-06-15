import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/employer/post/job/job-application";
const isUseJwt = true;

export const getJobApplicationsByPostId = async (
  postId,
  pageNumber = 1,
  pageSize = 10,
  searchTerm = "",
  statusJobApplication = null,
  onSuccess,
  onFail,
  onException
) => {
  const queryParams = new URLSearchParams({
    postId: postId,
    pageNumber: pageNumber,
    pageSize: pageSize,
  });
  if (searchTerm) {
    queryParams.append("searchTerm", searchTerm);
  }
  if (statusJobApplication) {
    queryParams.append("statusJobApplication", statusJobApplication);
  }
  const fullUri = `${uri}?${queryParams.toString()}`;
  await ApiGetRequest(fullUri, isUseJwt, onSuccess, onFail, onException);
};
