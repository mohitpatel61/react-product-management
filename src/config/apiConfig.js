const API_BASE_URL = "http://localhost:2100"; // Replace with your actual API URL

export const getAuthHeaders = () => {
    const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  };

 export const apiEndpoints = {
  backend_url: API_BASE_URL,
  login: `${API_BASE_URL}/login`,
  getProducts: `${API_BASE_URL}/api/products`,
  createProduct: `${API_BASE_URL}/api/products/create`,
  updateProduct: `${API_BASE_URL}/api/products/updateProduct`,
  deleteProduct: (id) => `${API_BASE_URL}/api/products/delete/${id}`,
  getProductDetails: (id) => `${API_BASE_URL}/api/products/getDetail/${id}`,
  updateProductPic: `${API_BASE_URL}/api/products/updateProductImage`
};

