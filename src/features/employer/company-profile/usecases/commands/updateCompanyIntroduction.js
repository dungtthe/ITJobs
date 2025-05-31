import { ApiPatchRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/employer/profile/update/company-introduction";
const isUseJwt = true;

export const updateCompanyIntroduction = async (
  data,
  onSuccess,
  onFail,
  onException
) => {
  try {
    await ApiPatchRequest(
      uri,
      { companyIntroduction: data },
      isUseJwt,
      onSuccess,
      onFail,
      onException
    );
  } catch (error) {
    console.error("Error in updateCompanyIntroduction:", error);
    onException(error);
  }
};
