import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/candidate/employer/summary";
const isUseJwt = false;

export const getEmployerSummary = async (
  id,
  onSuccess,
  onFail,
  onException
) => {
  await ApiGetRequest(uri + "/" + id, isUseJwt, onSuccess, onFail, onException);
};
