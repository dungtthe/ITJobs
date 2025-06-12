import { ApiPostRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/candidate/profile/work-experience/add-or-update";
const isUseJwt = true;

export const addOrUpdateWorkExperience = async (
  data,
  onSuccess,
  onFail,
  onException
) => {
  await ApiPostRequest(uri, data, isUseJwt, onSuccess, onFail, onException);
};
