import { ApiPostRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/candidate/post/job/apply";
const isUseJwt = true;

export const applyJob = async (data, onSuccess, onFail, onException) => {
  await ApiPostRequest(uri, data, isUseJwt, onSuccess, onFail, onException);
};
