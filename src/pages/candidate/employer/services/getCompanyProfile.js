import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/candidate/employer/company-profile";
const isUseJwt = false;

export const getCompanyProfile = async (id, onSuccess, onFail, onException) => {
  await ApiGetRequest(uri + "/" + id, isUseJwt, onSuccess, onFail, onException);
};
