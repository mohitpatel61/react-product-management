import React,{useState} from 'react';
import ChangePasswordForm from './ChangePasswordForm';
import { userInfo } from '../utils/loggedUserData'; 
import { changePassword } from '../services/authService';

const ChangePassword = () => {
      const [changePassData, setChangePassData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            setSuccessMessage('');
            setErrorMessage('');

            const res = await changePassword(changePassData);
            if(res.status == 200){
                setSuccessMessage(res.message);
                setTimeout(() => {
                    setSuccessMessage('');
                },3000);
            }
            else if(res.status == 401){
                
                setErrorMessage(res.message);
                setTimeout(() => {
                    setErrorMessage('');
                },3000);
            }
            else{
                setErrorMessage(error.message);
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    //Set state data on change form data
    const handleChange = (e) => {
       setChangePassData({...changePassData, [e.target.name]: e.target.value});
    }

        return (
            <ChangePasswordForm
            changePassData= {changePassData}
            loggedUserData= {userInfo}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            successMessage={successMessage}
            errorMessage={errorMessage}
            />
        );
};
 
export default ChangePassword;