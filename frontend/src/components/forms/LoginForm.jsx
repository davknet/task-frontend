
import React, {  useState  , useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import './style/style.css' ;
import { useNavigate } from "react-router-dom";
















const LoginForm = () => {

  const [email , setEmail ]       = useState("");
  const [password , setPassword ] = useState("");
  const [errors, setErrors]       = useState({});
  const {login}                   = useContext(AuthContext);
  const navigate                  = useNavigate();


  const handleSubmit = async (e) => {


      e.preventDefault();
      setErrors({});

      let validationErrors = {} ;

      if (!email || email.length === 0 ) validationErrors.email           = "Email or Username is require !!!  " ;
      if (!password || password.length === 0 ) validationErrors.password  = "Password is required";

      if(Object.keys(validationErrors).length > 0 )
      {
        setErrors(validationErrors) ;
        return ; 
      }



      const res = await login(  email , password   ) ;

      if(!res )
      {
          validationErrors.password = 'server error !!! ' ;
          setErrors(validationErrors);
      }

       navigate("/tasks");

  }



    return (

         <>

             <div className="login-container">
                        <h2>Login</h2>
                            <form onSubmit={handleSubmit} className="login-form">
                                <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                />
                                {errors.email && <div className="error-message">{errors.email}</div>}
                                </div>

                                <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                />
                                {errors.password && <div className="error-message">{errors.password}</div>}
                                </div>

                                <button type="submit" className="login-button">Login</button>
                                <a href="#" className="forgot-password">Forgot password?</a>
                            </form>
            </div>


         </>

    )
}




export default LoginForm ;