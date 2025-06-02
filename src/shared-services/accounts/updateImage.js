import { ApiPatchRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/update-image";
const isUseJwt = true;

export const updateImage = async (data, onSuccess, onFail, onException) => {
  try {
    await ApiPatchRequest(
      uri,
      { image: data },
      isUseJwt,
      onSuccess,
      onFail,
      onException
    );
  } catch (error) {
    console.error("Error in updateLogo:", error);
    onException(error);
  }
};
