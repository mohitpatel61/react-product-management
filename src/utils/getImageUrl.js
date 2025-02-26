import { apiEndpoints } from "../config/apiConfig";

export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return "https://placeholder.pics/svg/300"; // Default placeholder
  }
  if(imagePath instanceof File){
    return URL.createObjectURL(imagePath);
  }
  
  return `${apiEndpoints.backend_url}${imagePath}`;
};
