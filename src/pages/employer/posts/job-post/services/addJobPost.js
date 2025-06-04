import { ApiPostRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/employer/post/job/add";
const isUseJwt = true;

export const addJobPost = async (data, onSuccess, onFail, onException) => {
  try {
    await ApiPostRequest(uri, data, isUseJwt, onSuccess, onFail, onException);
  } catch (error) {
    console.error("Error in addJobPost:", error);
    onException(error);
  }
};
