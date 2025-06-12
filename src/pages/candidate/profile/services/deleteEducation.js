import { ApiDeleteRequest } from "@/utils/httpHandlerUtils.js";

const isUseJwt = true;
export const deleteEducation = async (
  educationId,
  onSuccess,
  onFail,
  onException
) => {
  const uri = `/api/candidate/profile/education/delete/${educationId}`;
  await ApiDeleteRequest(uri, null, isUseJwt, onSuccess, onFail, onException);
};
