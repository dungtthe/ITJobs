import { ApiPostRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/candidate/profile/project/add-or-update";
const isUseJwt = true;

export const addOrUpdateProject = async (
  data,
  onSuccess,
  onFail,
  onException
) => {
  await ApiPostRequest(uri, data, isUseJwt, onSuccess, onFail, onException);
};
