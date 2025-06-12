import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/search-filter/company-types";
const isUseJwt = false;

export const getCompanyTypes = async (onSuccess, onFail, onException) => {
  try {
    await ApiGetRequest(uri, isUseJwt, onSuccess, onFail, onException);
  } catch (error) {
    console.error("Error in getCompanyTypes:", error);
    onException(error);
  }
};
