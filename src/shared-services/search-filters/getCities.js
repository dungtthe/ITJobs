import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/search-filter/cities";
const isUseJwt = false;

export const getCities = async (onSuccess, onFail, onException) => {
  try {
    await ApiGetRequest(uri, isUseJwt, onSuccess, onFail, onException);
  } catch (error) {
    console.error("Error in getCities:", error);
    onException(error);
  }
};
