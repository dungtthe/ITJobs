import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/search-filter";
const isUseJwt = false;

export const getSearchFilters = async (onSuccess, onFail, onException) => {
  try {
    await ApiGetRequest(uri, isUseJwt, onSuccess, onFail, onException);
  } catch (error) {
    console.error("Error in getSearchFilters:", error);
    onException(error);
  }
};
