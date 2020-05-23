import axios from "axios";
import {getJWT} from "./authService"

axios.defaults.headers.common["Authorization"] = `Bearer ${getJWT()}`;

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
     alert("Could connect to the server")
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
