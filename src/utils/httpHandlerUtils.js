const BE_ENDPOINT = "https://localhost:7049";
const HEADERS = {
  "Content-Type": "application/json",
  accept: "application/json",
};

const GetHeaders = () => {
  const token = localStorage.getItem("jwtToken");
  if (token === null) {
    return HEADERS;
  }
  return {
    ...HEADERS,
    Authorization: `Bearer ${token}`,
  };
};

export const ApiGetRequest = async (
  uri,
  isUseJwt,
  onSuccess,
  onFail,
  onException
) => {
  try {
    const headers = isUseJwt ? GetHeaders() : HEADERS;
    const res = await fetch(`${BE_ENDPOINT}${uri}`, {
      method: "GET",
      headers,
    });
    const data = await res.json();
    if (res.ok) {
      onSuccess(data);
    } else {
      onFail(data);
    }
  } catch (error) {
    onException(error);
  }
};
