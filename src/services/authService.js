import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode"

const apiEndpoint = apiUrl + "/api/token/";
const tokenKey = "token";

http.setJwt(getJwt());

export function login(email, password) {
  return http.post(apiEndpoint, { email, password });
}

export function logout() {
  localStorage.removeItem(tokenKey)
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