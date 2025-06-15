import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/candidate/employer/company-profile/reviews";
const isUseJwt = false;

export const getReviewsByUserId = async (
  userId,
  pageNumber = 1,
  pageSize = 10,
  onSuccess,
  onFail,
  onException
) => {
  const queryParams = new URLSearchParams({
    pageNumber: pageNumber,
    pageSize: pageSize,
  });

  const fullUri = `${uri}/${userId}?${queryParams.toString()}`;

  await ApiGetRequest(fullUri, isUseJwt, onSuccess, onFail, onException);
};
