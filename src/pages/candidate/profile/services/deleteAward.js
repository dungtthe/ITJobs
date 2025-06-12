import { ApiDeleteRequest } from "@/utils/httpHandlerUtils.js";

const isUseJwt = true;
export const deleteAward = async (awardId, onSuccess, onFail, onException) => {
  const uri = `/api/candidate/profile/award/delete/${awardId}`;
  await ApiDeleteRequest(uri, null, isUseJwt, onSuccess, onFail, onException);
};
