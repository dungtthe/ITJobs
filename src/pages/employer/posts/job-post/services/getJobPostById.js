import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const isUseJwt = true;

export const getJobPostById = async (
  postId,
  onSuccess,
  onFail,
  onException
) => {
  const uri = `/api/employer/post/job/${postId}`;
  await ApiGetRequest(uri, isUseJwt, onSuccess, onFail, onException);
};
