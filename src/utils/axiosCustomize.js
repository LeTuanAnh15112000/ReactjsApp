import axios from "axios";
import NProgress from "nprogress"
import { store } from "../redux/store"

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
})

const instance = axios.create({
  baseURL: "http://localhost:8081/",
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // add token headers
  const access_token = store?.getState()?.user?.account?.access_token;
  // console.log(access_token);
  config.headers["Authorization"] = "Bearer " + access_token;

  NProgress.start();
  return config;
},function (error) {
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    NProgress.done();
    return response.data ? response.data : response;
  },
  function (error) {
    NProgress.done();
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
