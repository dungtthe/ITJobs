import { ApiPatchRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/employer/profile/update/skills";
const isUseJwt = true;

export const updateSkills = async (data, onSuccess, onFail, onException) => {
  try {
    await ApiPatchRequest(
      uri,
      { skills: data },
      isUseJwt,
      onSuccess,
      onFail,
      onException
    );
  } catch (error) {
    console.error("Error in updateSkills:", error);
    onException(error);
  }
};
