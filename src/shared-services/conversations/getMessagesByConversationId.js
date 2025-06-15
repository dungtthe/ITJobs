import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/conversation";
const isUseJwt = true;

export const getMessagesByConversationId = async (
  id,
  onSuccess,
  onFail,
  onException
) => {
  await ApiGetRequest(uri + "/" + id, isUseJwt, onSuccess, onFail, onException);
};
