import { ApiPatchRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/candidate/profile/update/about-me";
const isUseJwt = true;

export const updateAboutme = async (data, onSuccess, onFail, onException) => {
  await ApiPatchRequest(
    uri,
    { candidateAboutme: data },
    isUseJwt,
    onSuccess,
    onFail,
    onException
  );
};
