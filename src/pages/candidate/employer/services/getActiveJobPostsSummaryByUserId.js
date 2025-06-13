import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/candidate/post/job";
const isUseJwt = false;

export const getActiveJobPostsSummaryByUserId = async (
  id,
  onSuccess,
  onFail,
  onException
) => {
  await ApiGetRequest(
    uri + "?userId=" + id,
    isUseJwt,
    onSuccess,
    onFail,
    onException
  );
};
