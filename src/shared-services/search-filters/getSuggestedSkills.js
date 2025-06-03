import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/search-filter/skill/suggestions";
const isUseJwt = false;

export const getSuggestedSkills = async (
  count,
  onSuccess,
  onFail,
  onException
) => {
  try {
    await ApiGetRequest(
      `${uri}?count=${count}`,
      isUseJwt,
      onSuccess,
      onFail,
      onException
    );
  } catch (error) {
    console.error("Error in getSuggestedSkills:", error);
    onException(error);
  }
};
