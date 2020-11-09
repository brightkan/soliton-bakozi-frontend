import http from "./httpService";
import { apiUrl } from "../config.json";
import { getJwt } from './authService';

http.setJwt(getJwt());

export function getAllSolitonUsers() {

  const apiEndpoint = apiUrl + "/api/v1/hr-system/solitonusers/";
  return http.get(apiEndpoint);
}





export default {
   getAllSolitonUsers

}