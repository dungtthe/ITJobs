import { ApiPatchRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/employer/profile/update/overview";
const isUseJwt = true;

export const updateOverView = async (data, onSuccess, onFail, onException) => {
  try {
    await ApiPatchRequest(uri, data, isUseJwt, onSuccess, onFail, onException);
  } catch (error) {
    console.error("Error in updateSkills:", error);
    onException(error);
  }
};
