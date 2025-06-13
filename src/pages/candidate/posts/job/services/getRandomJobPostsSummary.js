import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/candidate/post/random-job";
const isUseJwt = false;

export const getRandomJobPostsSummary = async (
  excludePostId,
  count,
  onSuccess,
  onFail,
  onException
) => {
  const fullUri = `${uri}?excludePostId=${excludePostId}&count=${count}`;
  await ApiGetRequest(fullUri, isUseJwt, onSuccess, onFail, onException);
};
