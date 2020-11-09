import http from "./httpService";
import { apiUrl } from "../config.json";
import { getJwt } from './authService';

http.setJwt(getJwt());

export function getAllUsers() {

  const apiEndpoint = apiUrl + "/api/v1/hr-system/users/";
  return http.get(apiEndpoint);
}





export default {
   getAllUsers

}