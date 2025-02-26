import React, { useEffect, useState } from "react";
import { apiEndpoints } from "../../config/apiConfig";
import { getProfileData, updateProfile, updateUserProfilePic } from "../../services/authService";
import Profile from "./Profile";
import { validateProfileData } from "../../utils/validation/loginValidation";

const ProfileMain = () => {
 const [userInfo, setUserInfo] = useState({
  first_name : "",
  last_name : "",
  email: "",
  profileImage : "",
  thumbnail_image: "",
  previewImage: "",
  errorDisplay: false,
  errorData: {}
 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [errorData, setErrorData] = useState({});

 

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);
        const data = await getProfileData();
        if (data?.userData) {
          setUserInfo(data.userData);
        } else {
          throw new Error("No products found");
        }
      } catch (error) {
        setError(error.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    loadProfileData();
  }, []);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
     const validate = validateProfileData(userInfo);
      if(validate.status === "success"){
        setSuccessMessage('');
        setErrorMessage('');
        const res = await updateProfile(userInfo);
        if(res.status == 200){
          setSuccessMessage(res.message);
          setTimeout(() => setSuccessMessage(""), 3000);
        }
        else{
          setErrorMessage(res.message);
          setTimeout(() => setErrorMessage(""), 3000);
        }
      }
      else{
        setErrorData(validate);
        setErrorDisplay(true);
      }
     
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => setErrorMessage(""), 3000);
    }
 };


  const handleProfilePicUpdate = async (e) => {
    const file = e.target.files[0];
   
    if(file){
    
    //Update profile image code
    try {
      const formData = new FormData();
      formData.append('profileImage', file);
      const response = await updateUserProfilePic(formData);
      if(response.status == 200){
      setSuccessMessage(response.message);
      setTimeout(()=>{
          setSuccessMessage("");
      },3000);
        setUserInfo((prevState) => ({ ...prevState,
          thumbnail_image: response.thumbnail_image,
          profileImage: response.profile_image,
        }));
    }
    } catch (error) {
      setErrorMessage(error.message)
      setTimeout(()=>{
        setErrorMessage("");
    },3000);
    }
  
    }
    else{
      setErrorMessage("File not found");
      setTimeout(()=>{
        setErrorMessage("");
    },3000);
    }
  }

  if (loading) return <p className="text-center text-primary">Loading profile...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;
  
  return ( 
    
      <Profile userInfo={userInfo} 
               handleChange={handleChange}
               handleSubmit={handleSubmit}
               successMessage={successMessage}
               errorMessage={errorMessage}
               handleProfilePicUpdate = {handleProfilePicUpdate}
               errorData = {errorData}
               errorDisplay = {errorDisplay}
               />
    );
};
 
export default ProfileMain;
  