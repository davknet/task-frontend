import { useContext  } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";














const RegisterNewUser = async  ( name , last_name , email , password ) => {
  
         const endpoint = "http://localhost:5000/api/register";
       

         const response = await axios.post(endpoint , {

             "name"      : name      ,
             "last_name" : last_name ,
             "email"     : email     ,
             "password"  : password 

         });
         
  return response.data ;

}



export default  RegisterNewUser ;