import { decodeJwt as decode } from "jose";
import axiosAuth from "./axiosAuth";

class Auth {
  async checkLogin() {
    const access = this.getToken("access");
    const refresh = this.getToken("refresh");
    if (this.isTokenExpired(access)) {
      if (this.isTokenExpired(refresh)) {
        return null;
      } else {
        const newAccess = await this.getNewAccessToken(refresh);
        return newAccess;
      }
    } else {
      return access;
    }
  }
  checkHasConfirmed() {
    return decode(localStorage.getItem("access")).has_confirmed;
  }
  async getNewAccessToken() {
    console.log("Refreshing Access Token");
    try {
      const { data } = await axiosAuth.post("/jwt/refresh/", {
        refresh: this.getToken("refresh"),
      });
      console.log(data);
      this.setAccessToken(data.access);
      return data.access;
    } catch (e) {
      console.log(e);
    }
  }

  isTokenExpired(token) {
    if (token === "" || !token) return true;
    try {
      const decoded = decode(token);
      return decoded.exp ? decoded.exp < Date.now() / 1000 : false;
    } catch (err) {
      return false;
    }
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
    const access = this.getToken("access");
    if (access) {
      return true;
    }
    return false;
  }

  setRefreshToken(ref) {
    localStorage.setItem("refresh", ref);
  }
  setAccessToken(acc) {
    localStorage.setItem("access", acc);
  }
  logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    // window.location.reload();
  }
}

const auth = new Auth();

export default auth;
