import { ApiPostRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/candidate/profile/certification/add-or-update";
const isUseJwt = true;

export const addOrUpdateCertification = async (
  data,
  onSuccess,
  onFail,
  onException
) => {
  await ApiPostRequest(uri, data, isUseJwt, onSuccess, onFail, onException);
};
