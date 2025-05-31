import { getJwtToken } from "@/stores/authStore";

const BE_ENDPOINT = "https://localhost:7049";
const HEADERS = {
  "Content-Type": "application/json",
  accept: "application/json",
};

const GetHeaderWithToken = () => {
  const token = getJwtToken();
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
    const headers = isUseJwt ? GetHeaderWithToken() : HEADERS;
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

export const ApiPostRequest = async (
  uri,
  body,
  isUseJwt,
  onSuccess,
  onFail,
  onException
) => {
  try {
    const headers = isUseJwt ? GetHeaderWithToken() : HEADERS;
    const res = await fetch(`${BE_ENDPOINT}${uri}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
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

export const ApiPutRequest = async (
  uri,
  body,
  isUseJwt,
  onSuccess,
  onFail,
  onException
) => {
  try {
    const headers = isUseJwt ? GetHeaderWithToken() : HEADERS;
    const res = await fetch(`${BE_ENDPOINT}${uri}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
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

export const ApiPatchRequest = async (
  uri,
  body,
  isUseJwt,
  onSuccess,
  onFail,
  onException
) => {
  try {
    const headers = isUseJwt ? GetHeaderWithToken() : HEADERS;
    const res = await fetch(`${BE_ENDPOINT}${uri}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(body),
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
