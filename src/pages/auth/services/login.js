import { ApiPostRequest } from "@/utils/httpHandlerUtils.js";

const uri = "/api/login";
const isUseJwt = false;
export const login = async (
  email,
  password,
  onSuccess,
  onFail,
  onException
) => {
  try {
    const body = {
      email: email,
      password: password,
    };
    await ApiPostRequest(uri, body, isUseJwt, onSuccess, onFail, onException);
  } catch (error) {
    console.error("Error in login:", error);
    onException(error);
  }
};
