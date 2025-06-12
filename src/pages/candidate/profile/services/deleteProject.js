import { ApiDeleteRequest } from "@/utils/httpHandlerUtils.js";

const isUseJwt = true;
export const deleteProject = async (
  projectId,
  onSuccess,
  onFail,
  onException
) => {
  const uri = `/api/candidate/profile/project/delete/${projectId}`;
  await ApiDeleteRequest(uri, null, isUseJwt, onSuccess, onFail, onException);
};
