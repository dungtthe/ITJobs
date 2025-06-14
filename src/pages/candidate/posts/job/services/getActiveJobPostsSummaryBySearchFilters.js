import { ApiPostRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/candidate/post/job/search";
const isUseJwt = false;

export const getActiveJobPostsSummaryBySearchFilters = async (
  filters,
  onSuccess,
  onFail,
  onException
) => {
  await ApiPostRequest(uri, filters, isUseJwt, onSuccess, onFail, onException);
};
