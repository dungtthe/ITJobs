import { ApiPostRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/candidate/profile/award/add-or-update";
const isUseJwt = true;

export const addOrUpdateAward = async (
  data,
  onSuccess,
  onFail,
  onException
) => {
  await ApiPostRequest(uri, data, isUseJwt, onSuccess, onFail, onException);
};
