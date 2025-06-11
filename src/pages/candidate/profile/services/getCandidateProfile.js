import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/candidate/profile";
const isUseJwt = true;

export const getCandidateProfile = async (onSuccess, onFail, onException) => {
  try {
    await ApiGetRequest(uri, isUseJwt, onSuccess, onFail, onException);
  } catch (error) {
    console.error("Error in getCandidateProfile:", error);
    onException(error);
  }
};
