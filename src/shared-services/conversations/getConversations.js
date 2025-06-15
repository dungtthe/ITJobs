import { ApiGetRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/conversation";
const isUseJwt = true;

export const getConversations = async (onSuccess, onFail, onException) => {
  await ApiGetRequest(uri, isUseJwt, onSuccess, onFail, onException);
};
