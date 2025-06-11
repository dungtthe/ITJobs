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

export const ApiDeleteRequest = async (
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
      method: "DELETE",
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

export const ApiUploadFiles = async (
  actionType,
  files,
  isUseJwt,
  onSuccess,
  onFail,
  onException
) => {
  try {
    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }

    const token = getJwtToken();
    const headers =
      isUseJwt && token ? { Authorization: `Bearer ${token}` } : {};

    const res = await fetch(
      `${BE_ENDPOINT}/api/file/upload?actionType=${actionType}`,
      {
        method: "POST",
        headers,
        body: formData,
      }
    );

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

export const ViewCV = async (
  fileName,
  isUseJwt,
  onSuccess,
  onFail,
  onException
) => {
  try {
    const headers = isUseJwt ? GetHeaderWithToken() : HEADERS;
    const res = await fetch(`${BE_ENDPOINT}/api/file/cv?fileName=${fileName}`, {
      method: "GET",
      headers,
    });

    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      onSuccess(url);
    } else {
      const err = await res.json();
      onFail(err);
    }
  } catch (error) {
    onException(error);
  }
};
