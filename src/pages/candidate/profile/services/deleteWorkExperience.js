import { ApiDeleteRequest } from "@/utils/httpHandlerUtils.js";

const isUseJwt = true;
export const deleteWorkExperience = async (
  workExperienceId,
  onSuccess,
  onFail,
  onException
) => {
  const uri = `/api/candidate/profile/work-experience/delete/${workExperienceId}`;
  await ApiDeleteRequest(uri, null, isUseJwt, onSuccess, onFail, onException);
};
