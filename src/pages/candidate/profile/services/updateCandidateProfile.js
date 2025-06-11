import { ApiPatchRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/candidate/profile/update/overview";
const isUseJwt = true;

export const updateCandidateProfile = async (
  data,
  onSuccess,
  onFail,
  onException
) => {
  try {
    console.log(data);
    await ApiPatchRequest(uri, data, isUseJwt, onSuccess, onFail, onException);
  } catch (error) {
    console.error("Error in updateCandidateProfile:", error);
    onException(error);
  }
};
