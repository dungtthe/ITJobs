import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/employer/profile";
const isUseJwt = true;

export const getCompanyProfile = async (onSuccess, onFail, onException) => {
  try {
    await ApiGetRequest(uri, isUseJwt, onSuccess, onFail, onException);
  } catch (error) {
    console.error("Error in getCompanyProfile:", error);
    onException(error);
  }
};
