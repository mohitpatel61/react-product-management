import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { login } from "../../services/authService";
import { loginValidation } from "../../utils/validation/loginValidation";

const Login = () => {
 
 
  const [loginData, setLoginData] = useState({
    email : "",
    password : ""
  });

  const [validateLogin, setValidateData] = useState({});

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login: loginContext }  = useContext(AuthContext);
  const [displayError, setDisplayError] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();

    //validate request
   const validate = loginValidation(loginData);
   if(validate.status === 'success' ){
    try {
    const userData = await login(loginData);
    loginContext(userData); // ✅ Store user in AuthContext
    navigate("/dashboard"); // Redirect after login
    } catch (error) {
      setError("Invalid email or password");
    }
    setValidateData("");
   }
   else{
    setDisplayError(true);
    setValidateData(validate);
   }
  };

  const handleChange = (e) => {
  setLoginData({...loginData , [e.target.name]:e.target.value});
  }

  return (
    <main className="container mt-5">
      <div className="row">
        <h2>Login Page</h2>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="userEmail" className="form-label">Email address</label>
            <input
              type="text"
              className="form-control"
              id="userEmail"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              
            />
             { displayError && validateLogin.email != "" &&
            <span style= {{color:"red"}}>{validateLogin.email}</span>
             
            }
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={loginData.password}
              onChange = {handleChange}
              // onChange={(e) => setPassword(e.target.value)}
              
            />
            { displayError && validateLogin.password != "" &&
            <span style= {{color:"red"}}>{validateLogin.password}</span>
             
            }
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </main>
  );
};

export default Login;
