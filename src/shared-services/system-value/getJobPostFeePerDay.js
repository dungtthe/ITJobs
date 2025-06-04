import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/employer/system-value/job-post-fee-per-day";
const isUseJwt = true;

export const getJobPostFeePerDay = async (onSuccess, onFail, onException) => {
  try {
    await ApiGetRequest(uri, isUseJwt, onSuccess, onFail, onException);
  } catch (error) {
    console.error("Error in getJobPostFeePerDay:", error);
    onException(error);
  }
};
