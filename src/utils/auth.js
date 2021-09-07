/*
 * @Author: 陈诚
 * @Date: 2021-09-07 09:01:19
 * @LastEditTime: 2021-09-07 09:07:38
 * @LastEditors: 陈诚
 * @Description:
 */
// import Cookies from "js-cookie";
const TokenKey = "Admin-Token";

export function getToken() {
  // Cookies.get(TokenKey)
  return sessionStorage.getItem(TokenKey);
}

export function setToken(value) {
  //  Cookies.set(TokenKey, value)
  return sessionStorage.setItem(TokenKey, value);
}

export function removeToken() {
  // Cookies.remove(TokenKey)
  return sessionStorage.removeItem(TokenKey);
}
