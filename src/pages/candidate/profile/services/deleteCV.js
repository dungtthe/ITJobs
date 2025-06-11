import { ApiDeleteRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/candidate/delete-cv";
const isUseJwt = true;

export const deleteCV = async (cvId, onSuccess, onFail, onException) => {
  await ApiDeleteRequest(
    uri + `/${cvId}`,
    {},
    isUseJwt,
    onSuccess,
    onFail,
    onException
  );
};
