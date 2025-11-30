import { useState , useRef , useContext  } from "react";
import LoginForm from "../forms/LoginForm";
import './style/login.css' ;













const Login = () => {



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