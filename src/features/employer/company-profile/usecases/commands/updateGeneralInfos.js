import { ApiPatchRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/employer/profile/update/general-info";
const isUseJwt = true;

export const updateGeneralInfos = async (
  data,
  onSuccess,
  onFail,
  onException
) => {
  try {
    await ApiPatchRequest(
      uri,
      { generalInfos: data },
      isUseJwt,
      onSuccess,
      onFail,
      onException
    );
  } catch (error) {
    console.error("Error in updateGeneralInfos:", error);
    onException(error);
  }
};
