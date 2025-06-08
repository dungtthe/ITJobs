import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/admin/employer/company-names";
const isUseJwt = true;

export const getCompanyNames = async (onSuccess, onFail, onException) => {
  try {
    await ApiGetRequest(uri, isUseJwt, onSuccess, onFail, onException);
  } catch (error) {
    console.error("Error in getCompanyNames:", error);
    onException(error);
  }
};
