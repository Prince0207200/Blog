import { Client, ID, Databases, Storage, Query } from "appwrite";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export class Service {
  client = new Client();
  databases;
  bucket;

  async createPost(formData) {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      const response = await axios.post(`${API}/api/v1/users/create-post`, formData, config);
      return response.data;
    } catch (error) {
      console.log("Error in createPost:", error);
      throw error;
    }
  }

  async updatePost(id, formdata) {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      const response = await axios.patch(`${API}/api/v1/users/update/${id}`, formdata, config);
      return response.data;
    } catch (error) {
      console.log(" :: updatePost :: error", error);
    }
  }

  async deletePost(id) {
    try {
      await axios.delete(`${API}/api/v1/users/delete/${id}`, {
        withCredentials: true,
      });
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(id) {
    try {
      const response = await axios.get(`${API}/api/v1/users/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  async getPosts() {
    try {
      const response = await axios.get(`${API}/api/v1/users/all-posts`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  async getUserPosts() {
    try {
      const response = await axios.get(`${API}/api/v1/users/user-posts`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(" :: getUserPosts :: error", error);
      return false;
    }
  }

  async toggleLike(id) {
    try {
      const response = await axios.put(`${API}/api/v1/users/${id}/like`, {}, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log("like error", error);
      return false;
    }
  }

  async getPostLikes(id) {
    try {
      const response = await axios.get(`${API}/api/v1/users/${id}/like`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log("post like error", error);
      return false;
    }
  }

  async addComment(postId, content, parentId = "") {
    try {
      const response = await axios.post(`${API}/api/v1/users/add-comment`, {
        content,
        postId,
        parentId
      }, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      console.error("Comment error", error);
    }
  }

  async getComments(id) {
    try {
      const response = await axios.get(`${API}/api/v1/users/comment/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Comment fetch error", error);
    }
  }
}

const service = new Service();
export default service;
