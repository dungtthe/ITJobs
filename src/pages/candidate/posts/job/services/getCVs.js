import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/candidate/cvs";
const isUseJwt = true;

export const getCVs = async (onSuccess, onFail, onException) => {
  await ApiGetRequest(uri, isUseJwt, onSuccess, onFail, onException);
};
