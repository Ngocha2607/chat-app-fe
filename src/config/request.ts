import axios from "axios";

const httpInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});
export const httpInstanceNoAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const httpMultipartInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

httpInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("accessToken");
  config.headers["Content-Type"] = "application/json";
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

httpInstance.interceptors.response.use(function (response) {
  if (response.status === 200) return response;
  console.log(response);
  return response;
});

httpInstanceNoAuth.interceptors.request.use(function (config) {
  config.headers["Content-Type"] = "application/json";
  return config;
});

httpInstanceNoAuth.interceptors.response.use(function (response) {
  if (response.status === 200) return response;
  console.log(response);
  return response;
});
httpMultipartInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("accessToken");
  const companyCode = localStorage.getItem("companyCode");
  const language = localStorage.getItem("language");
  const timeZone = localStorage.getItem("timeZone");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (companyCode) config.headers["Company-Code"] = companyCode;
  if (language) config.headers["Language"] = language;
  if (timeZone) config.headers["Timezone"] = timeZone;
  return config;
});

httpMultipartInstance.interceptors.response.use(function (response) {
  if (response.status === 200) return response;
  console.log(response);
  return response;
});

export default httpInstance;
