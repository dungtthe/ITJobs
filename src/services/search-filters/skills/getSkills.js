import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/search-filter/skill";
const isUseJwt = false;

export const getSkills = async (onSuccess, onFail, onException) => {
  try {
    await ApiGetRequest(uri, isUseJwt, onSuccess, onFail, onException);
  } catch (error) {
    console.error("Error in getSkills:", error);
    onException(error);
  }
};
