import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/admin/employer";
const isUseJwt = true;

export const getEmployersSummary = async (onSuccess, onFail, onException) => {
  try {
    await ApiGetRequest(uri, isUseJwt, onSuccess, onFail, onException);
  } catch (error) {
    console.error("Error in getEmployersSummary:", error);
    onException(error);
  }
};
