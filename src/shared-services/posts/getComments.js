import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/post/comment";
const isUseJwt = false;

export const getComments = async (
  postId,
  pageNumber = 1,
  pageSize = 10,
  onSuccess,
  onFail,
  onException
) => {
  const queryParams = new URLSearchParams({
    pageNumber: pageNumber,
    pageSize: pageSize,
  });

  const fullUri = `${uri}/${postId}?${queryParams.toString()}`;

  await ApiGetRequest(fullUri, isUseJwt, onSuccess, onFail, onException);
};
