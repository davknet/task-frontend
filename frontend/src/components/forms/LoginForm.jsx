
import React, { useState } from "react";
import './style/style.css' ;












const LoginForm = () => {

   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});



    return (

         <>

             <div className="login-container">
                        <h2>Login</h2>
                            <form onSubmit={{/*handleSubmit*/}} className="login-form">
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