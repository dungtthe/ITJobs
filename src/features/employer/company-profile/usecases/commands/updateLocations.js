import { ApiPatchRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/employer/profile/update/locations";
const isUseJwt = true;

export const updateLocations = async (data, onSuccess, onFail, onException) => {
  try {
    await ApiPatchRequest(
      uri,
      { locations: data },
      isUseJwt,
      onSuccess,
      onFail,
      onException
    );
  } catch (error) {
    console.error("Error in updateLocations:", error);
    onException(error);
  }
};
