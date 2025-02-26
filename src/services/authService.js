import { getAuthHeaders } from "../config/apiConfig";
import api from "./api";

export const login = async (credentials) => {
  try {
    // console.log("login calla",credentials);return false;
    const response = await api.post("/api/login", credentials);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfileData = async () => {
  try {
    // console.log("login calla");return false;
    const response = await api.get("/api/userProfile", getAuthHeaders);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async(userInfo) => {
  try{
    const response = await api.post("/api/updateProfile", userInfo, getAuthHeaders);
    return response.data;
  }
  catch(error){
    throw error;
  }
};

export const updateUserProfilePic = async(formData) => {
  try {
     
    // console.log(formData);return false;
    const response = await api.post("/api/updateUserProfilePic", formData,{ headers: {
      "Content-Type": "multipart/form-data",  
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if needed
    }});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async(formData) => {
      try {
        const response = await api.post("/api/changePassword", formData, getAuthHeaders);
       
        return response.data;
      } catch (error) {
        
      }
};

export const logout = () => {
  localStorage.removeItem("token");
  // localStorage.removeItem("user");
};
