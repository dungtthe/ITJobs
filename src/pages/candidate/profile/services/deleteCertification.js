import { ApiDeleteRequest } from "@/utils/httpHandlerUtils.js";

const isUseJwt = true;
export const deleteCertification = async (
  certificationId,
  onSuccess,
  onFail,
  onException
) => {
  const uri = `/api/candidate/profile/certification/delete/${certificationId}`;
  await ApiDeleteRequest(uri, null, isUseJwt, onSuccess, onFail, onException);
};
