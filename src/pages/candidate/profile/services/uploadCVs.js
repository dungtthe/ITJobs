import { ApiUploadFiles } from "@/utils/httpHandlerUtils";
const actionType = "upload-cv";
const isUseJwt = true;

export const uploadCVs = async (files, onSuccess, onFail, onException) => {
  await ApiUploadFiles(
    actionType,
    files,
    isUseJwt,
    onSuccess,
    onFail,
    onException
  );
};
