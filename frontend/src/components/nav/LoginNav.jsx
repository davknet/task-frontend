import { useState , useContext } from 'react';
import { Link } from 'react-router-dom';
import './style/login-nav.css' ;
import { AuthContext } from "../context/AuthContext";





const LoginNav = () => {
     
     const { user, token , logout  } = useContext(AuthContext);


    console.log(user)  ;
    console.log(token) ;

  const handleLogout = () => {
        logout();
        navigate("/login");
     }


    return (

        <>
           <ul className="second-menu">

             { 
               user && token ?(
                <>
                    <li><span className="item"> Hello, {user.name}</span></li>
                    <li><Link to="/profile" className="item">Profile</Link></li>
                    <li><button onClick={handleLogout} className="item">Logout</button></li>
                </>
                ):(
                <>
                    <li><Link  to="/login"     className="item" id="">Login</Link></li>
                    <li><Link  to="/register"  className="item" id="">Register</Link></li>
                </>
                )
             }            
           </ul> 
        </>
    )
}




export default LoginNav ;