import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode"


const tokenKey = "token";

http.setJwt(getJwt());

export function login(email, password) {
  const apiEndpoint = apiUrl + "/api/token/";
  return http.post(apiEndpoint, { email, password });
}

export function logout() {
  localStorage.removeItem(tokenKey)
}

export function submitEmailPasswordReset(email){
  const apiEndpoint = apiUrl + "/api/v1/hr-system/users/reset_password/";
  return http.post(apiEndpoint, { email });
}

export function resetPassword(token, password){
  const apiEndpoint = apiUrl + "/api/v1/hr-system/users/accept_password_change/"
  return http.post(apiEndpoint,{token,password})
}

export function getCurrentUser() {
  try{
    const jwt = getJwt()
    return jwtDecode(jwt)
  }catch (e) {
    return null
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey)
}

export default {
  login,
  getCurrentUser,
  logout
}