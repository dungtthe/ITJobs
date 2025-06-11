import { ViewCV } from "@/utils/httpHandlerUtils";

const isUseJwt = false;

export const viewCVFile = async (fileName, onSuccess, onFail, onException) => {
  await ViewCV(fileName, isUseJwt, onSuccess, onFail, onException);
};
