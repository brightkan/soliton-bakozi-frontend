import http from "./httpService";
import { apiUrl } from "../config.json";
import { getJwt } from './authService';

http.setJwt(getJwt());

export function getAllEmployees() {

  const apiEndpoint = apiUrl + "/api/v1/hr-system/employees/";
  return http.get(apiEndpoint);
}

export default {
  getAllEmployees

}