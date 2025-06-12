import { ApiPostRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/candidate/profile/education/add-or-update";
const isUseJwt = true;

export const addOrUpdateEducation = async (
  data,
  onSuccess,
  onFail,
  onException
) => {
  await ApiPostRequest(uri, data, isUseJwt, onSuccess, onFail, onException);
};
