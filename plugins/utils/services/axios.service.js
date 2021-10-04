import axios from "axios";
import router from "@/router";

/**
 * Common config
 */
axios.defaults.timeout = 30000;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYWphckBtZW1iZXIuaWQiLCJmdWxsbmFtZSI6IkZhamFyIE51Z3JhaGEiLCJpYXQiOjE1OTkxMTkxMzksImV4cCI6MTYzMDY1NTEzOX0.wpmmXrZC8trgjRBbxKUpvQqkyOjGV0hUeV4777zIBVg";

/**
 * Axios for CMS api
 */
const AxiosCMS = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_API_VERSION}`
});

AxiosCMS.interceptors.response.use(response => response, errorResponseHandler);
function errorResponseHandler(error) {
  if (error.response.status === 403) {
    router.push({ path: "/403" });
  }
  if (error.response.status === 500) {
    router.push({ path: "/500" });
  }
  throw error;
}

/**
 * Set token on http request
 * @param {String} token
 */
const setTokenAxiosCMS = token => {
  AxiosCMS.defaults.headers.common["Authorization"] = token;
};

/**
 * Remove token on http request
 * @param {String} token
 */
const removeTokenAxiosCMS = () => {
  AxiosCMS.defaults.headers.common["Authorization"] = null;
};

/**
 * Multi Axios init
 */
// const customAxios = axios.create({
//   baseURL: "https://some-custom-domain.com/api/"
// });

export { AxiosCMS, setTokenAxiosCMS, removeTokenAxiosCMS };
