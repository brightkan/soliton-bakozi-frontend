import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode"

const apiEndpoint = apiUrl + "/api/token/";


const tokenKey = "token"

export function login(email, password) {
  console.log("..logining")
  return http.post(apiEndpoint, { email, password });
}

export function logout() {
  localStorage.removeItem(tokenKey)
}

export function getCurrentUser() {
  try{
    const jwt = getJWT()
    return jwtDecode(jwt)
  }catch (e) {
    return null
  }
}

export function getJWT() {
  return localStorage.getItem(tokenKey)
}

export default {
  login,
  getJWT,
  getCurrentUser,
  logout
}