import axios from "axios";

const API = import.meta.env.VITE_API_URL; // Access env variable

export class AuthService {
  async createAccount({ email, password, username, fullname, profileImage }) {
    try {
      const formData = new FormData();
      const fields = { email, password, username, fullname };

      Object.entries(fields).forEach(([key, value]) => formData.append(key, value));
      formData.append("profileImage", profileImage);

      const userAccount = await axios.post(`${API}/api/v1/users/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (userAccount) {
        console.log("Account created");
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await axios.post(`${API}/api/v1/users/login`, {
        email,
        password,
      }, { withCredentials: true });
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const response = await axios.get(`${API}/api/v1/users/currentUser`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log("getCurrentUser :: error", error);
    }
    return null;
  }

  async logout() {
    try {
      await axios.post(`${API}/api/v1/users/logout`, {}, {
        withCredentials: true,
      });
    } catch (error) {
      console.log("AuthService :: logout :: error", error);
    }
  }
}

const authService = new AuthService();
export default authService;
