import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";
import config from "@/constants";

// Create axios instance
const service = axios.create({
  baseURL: config.apiUrl,
  timeout: 5000, // request timeout
});

// Interceptor for requests
service.interceptors.request.use(
  (serviceConfig) => {
    if (store.getts.token) {
      // serviceConfig.headers['Token'] == getToken();
    }
    return serviceConfig;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Interceptor for responses
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.status !== 200) {
      return Message({
        message: res.message,
        type: "error",
        duration: 5 * 1000,
      });
    }
    return res;
  },
  (error) => {
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.resolve(error);
  }
);

export default service;
