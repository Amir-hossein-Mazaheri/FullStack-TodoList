import { decodeJwt as decode } from "jose";
import axiosAuth from "./axiosAuth";

class Auth {
  async getNewAccessToken() {
    console.log("Refreshing Access Token");
    try {
      const { data } = await axiosAuth.post("/jwt/refresh/", {
        refresh: this.getToken("refresh"),
      });
      console.log(data);

      this.setAccessToken(data.access);

      return data.access;
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  }

  isTokenExpired(token) {
    if (token === "" || !token) return true;
    const decodedToken = decode(token);
    const tokenExpiration = decodedToken.exp; // return Unix timestamp in seconds not in milliseconds

    return Date.now() / 1000 > tokenExpiration; // returns true if token expiration is before now
  }

  getToken(key) {
    // Retrieves the user token from localStorage
    return localStorage.getItem(key);
  }

  login(access, refresh) {
    // Saves user token to localStorage
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
  }

  isLoggedIn() {
    const accessToken = this.getToken("access");
    const refreshToken = this.getToken("refresh");

    const isRefreshExpired = this.isTokenExpired(refreshToken);

    console.log("access token : ", accessToken);
    console.log("refresh token : ", refreshToken);

    console.log(isRefreshExpired);

    return accessToken && refreshToken && !isRefreshExpired; // returns boolean
  }

  setRefreshToken(refreshToken) {
    localStorage.setItem("refresh", refreshToken);
  }
  setAccessToken(accessToken) {
    localStorage.setItem("access", accessToken);
  }

  logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }
}

const auth = new Auth();

export default auth;
