import axios from "axios";

export const LOGIN_URL = process.env.REACT_APP_BASE_URL + "/auth/signin";
export const REGISTER_URL =
  process.env.REACT_APP_BASE_URL + "/auth/signup/admin";

export const ME_URL = process.env.REACT_APP_BASE_URL + "/auth/me";

axios.defaults.headers.post["Content-Type"] = "application/json";

export function login(email, password) {
  
  return axios.post(
    LOGIN_URL,
    JSON.stringify({ email: email, password: password, roles: "ADMIN" })
  );
}

export function register(email, fullname, password) {
  return axios.post(
    REGISTER_URL,
    JSON.stringify({
      email: email,
      password: password,
      confirmPassword: password,
      fullName: fullname,
    })
  );
}

export function requestPassword(email) {
  return axios.get(
    process.env.REACT_APP_BASE_URL + `/auth/recover/${email}/ADMIN`
  );
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}

export function verifyToken(token) {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(
    process.env.REACT_APP_BASE_URL + `/auth/reset/${token}/ADMIN`
  );
}

export function resetPassword(token, password, confirmPassword) {
  return axios.post(
    process.env.REACT_APP_BASE_URL + `/auth/reset/${token}/ADMIN`,
    { password, confirmPassword }
  );
}
