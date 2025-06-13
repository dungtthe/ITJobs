import { ApiPutRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/employer/post/job/update";
const isUseJwt = true;

export const updateJobPost = async (data, onSuccess, onFail, onException) => {
  await ApiPutRequest(uri, data, isUseJwt, onSuccess, onFail, onException);
};
