import { ApiPatchRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/candidate/profile/update/about-me";
const isUseJwt = true;

export const updateAboutme = async (data, onSuccess, onFail, onException) => {
  try {
    await ApiPatchRequest(
      uri,
      { candidateAboutme: data },
      isUseJwt,
      onSuccess,
      onFail,
      onException
    );
  } catch (error) {
    console.error("Error in updateAboutme:", error);
    onException(error);
  }
};
