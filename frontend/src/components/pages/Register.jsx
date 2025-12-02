import { useState , useContext  } from "react";
import { AuthContext } from "../context/AuthContext";
import './style/register.css' ;
import RegisterFrom from "../forms/RegisterFrom";

















const Register = () => {


  const { user , token } = useContext(AuthContext);

     if ( user && token )
     {
        return null;
     }

    return (

          <>
             <div className="wrapper">
                  <RegisterFrom />
             </div>
          </>

    )
}





export default Register ;