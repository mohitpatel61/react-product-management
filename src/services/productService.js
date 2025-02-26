import { data } from "react-router-dom";
import api from "./api";
import { apiEndpoints, getAuthHeaders } from "../config/apiConfig";
import axios from "axios";



// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await axios.get(apiEndpoints.getProducts, getAuthHeaders());
    if(response.status == 200){
      return response.data.products;
    }
    
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Add a new product
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(apiEndpoints.createProduct, productData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    return null;
  }
};


export const getProductDetails = async(id) => {
  try {
    const response = await axios.get(apiEndpoints.getProductDetails(id), getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error.response?.data || error.message);
    return { error: error.response?.data?.message || "Failed to fetch product details" };
  }
};

export const removeProduct = async(productId) => {
    try {
      const response = await axios.delete(apiEndpoints.deleteProduct(productId), getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error("Error delete product:", error.response?.data || error.message);
    return { error: error.response?.data?.message || "Failed to delete product" };
    }
};

export const updateProductePic = async(formData) => {
  try {
    const response = await axios.post(apiEndpoints.updateProductPic,formData,{ headers: {
      "Content-Type": "multipart/form-data",  
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if needed
    }});
    return response.data;
  } catch (error) {
    console.error("Error Update product image:", error.response?.data || error.message);
    return { error: error.response?.data?.message || "Failed to Update product image" };
  }
};

export const updateProduct = async(formData) => {
  try {
    const response = await axios.post(apiEndpoints.updateProduct, formData, getAuthHeaders());
    return response.data;
    
  } catch (error) {
    
  }
}
