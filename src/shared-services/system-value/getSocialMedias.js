import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/system-value/social-media";
const isUseJwt = false;

export const getSocialMedias = async (onSuccess, onFail, onException) => {
  try {
    await ApiGetRequest(uri, isUseJwt, onSuccess, onFail, onException);
  } catch (error) {
    console.error("Error in getSocialMedias:", error);
    onException(error);
  }
};
