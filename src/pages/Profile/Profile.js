import React from 'react';
import Messages from '../../components/common/Messages';
import { getImageUrl } from '../../utils/getImageUrl';
import { FaCamera } from "react-icons/fa"; // Import camera icon

const Profile = ({ userInfo, handleChange , handleSubmit, successMessage, errorMessage, handleProfilePicUpdate, errorData, 
  errorDisplay }) => {
    return ( 
        <div className="row">
        <h2>My Profile</h2>
        <Messages type="success" message={successMessage} />
        <Messages type="danger" message={errorMessage} />
        <div className="col-4 position-relative text-center">
        <div className="position-relative d-inline-block">
                <input type="file"  style={{ display: "none" }} id="profilePicInput" onChange={handleProfilePicUpdate} />
                <img src= {getImageUrl(userInfo.thumbnail_image || userInfo.previewImage)} className="img-thumbnail rounded-circle"  style={{ width: "150px", height: "150px", objectFit: "cover" }}/>
                <label
            htmlFor="profilePicInput"
            className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-2"
            style={{
                cursor: "pointer",
                transform: "translate(25%, -25%)",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)"
            }}
        >
           <FaCamera size={18} onChange={handleProfilePicUpdate} />
        </label>
                
            </div>
        </div>
        <div className="col-8">
              <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="col-form-label">First Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="first_name"
                      value={userInfo?.first_name}
                      onChange={handleChange}
                    />
                    {errorDisplay && errorData.first_name !== "" &&
                    <span style={{color:"red"}} >{errorData.first_name}</span>
                    }
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">Last Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="last_name"
                      value={userInfo?.last_name}
                      onChange={handleChange}
                    />
                     {errorDisplay && errorData.last_name !== "" &&
                    <span style={{color:"red"}} >{errorData.last_name}</span>
                    }
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={userInfo?.email}
                      onChange={handleChange}
                    />
                      {errorDisplay && errorData.email !== "" &&
                    <span style={{color:"red"}} >{errorData.email}</span>
                    }
                   </div>
        
                   <div className="modal-footer">
                        <button type="submit" className="btn btn-primary" >
                        Save
                        </button>
                    </div>
                </form>
        </div>
    </div>
         );
}
   
   
        
    

 
export default Profile;