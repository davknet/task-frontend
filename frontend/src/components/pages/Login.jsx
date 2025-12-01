import {  useContext  } from "react";
import { AuthContext } from "../context/AuthContext";
import LoginForm from "../forms/LoginForm";
import { useNavigate } from "react-router-dom";
import './style/login.css' ;













const Login = () => {

  const { user , token } = useContext(AuthContext);
  const navigate        = useNavigate();


  if (user && token) {
    navigate('/');
    return null;
  }



    return (
            <>
               <div className="pages">
                         <div className="login-tab" >
                             <LoginForm /> 
                         </div>                      
               </div>     
            </>

    )
}



export default Login ; 