import { createContext, useState, useEffect } from "react";
import axios from "axios";



export const AuthContext = createContext();


export const AuthProvider = ({ children }) => { 

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

 


   useEffect(() => {

    const savedUser  = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(savedUser);
      setToken(savedToken);
    }




  }, []);



    const login = async (email, password) => {

        try{


            const res = await axios.post("http://localhost:5000/api/login" , {

             data : 
              { 
                 "email"     :   email     ,
                 "password"  :   password 
              }  
             } 
            );

           

            const userData  = res.data.user;
            const tokenData = res.data.token;

            setUser(userData);
            setToken(tokenData);

            localStorage.setItem("user", JSON.stringify(userData) );
            localStorage.setItem("token", tokenData);

            return res ;


        }catch(error)
        {

             return {
                      success : false,
                      error   : error.response?.data?.message || "Login failed"
                 };
        }


    }


 const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };


 return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );





};





