import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/candidate/employer/top-employer";
const isUseJwt = false;

export const getTopEmployersByApplicationsSummary = async (
  size,
  onSuccess,
  onFail,
  onException
) => {
  try {
    await ApiGetRequest(
      uri + "?pageSize=" + size,
      isUseJwt,
      onSuccess,
      onFail,
      onException
    );
  } catch (error) {
    console.error("Error in getTopEmployersByApplicationsSummary:", error);
    onException(error);
  }
};
