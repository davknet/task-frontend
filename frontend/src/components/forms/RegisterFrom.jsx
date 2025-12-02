import { useState } from 'react';
import './style/registerFrom.css';
import { useNavigate } from "react-router-dom";
import RegisterNewUser from '../context/RegisterNewUser';


const RegisterForm = () => {

    const [first_name,  setFirstName]   = useState('');
    const [last_name,   setLastName]    = useState('');
    const [email,       setEmail]       = useState('');
    const [password,    setPassword]    = useState('');
    const [password_r,  setPasswordRe]  = useState('');
   
    const navigate                        = useNavigate();

    const [name_err,    setNameErr]       = useState('');
    const [last_err,    setLastErr]       = useState('');
    const [email_err,   setEmailErr]      = useState('');
    const [pass_err,    setPasswordErr]   = useState('');
    const [pass_r_err,  setPassReErr  ]   = useState('');
    const [server_err ,  setServerError ] = useState('');



    const handleSubmit = async (e) => {
        e.preventDefault();

        let valid = true;

      
        if(first_name.length < 2){
            setNameErr("The Name must be more than two characters!");
            valid = false;
        } else if(!first_name.match(/^[A-Za-z\u0590-\u05FF]+$/)){
            setNameErr("Name must be English or Hebrew letters only");
            valid = false;
        } else setNameErr("");

       
        if(last_name.length < 2){
            setLastErr("The Last Name must be more than two characters!");
            valid = false;
        } else if(!last_name.match(/^[A-Za-z\u0590-\u05FF]+$/)){
            setLastErr("Last Name must be English or Hebrew letters only");
            valid = false;
        } else setLastErr("");

       
        if(!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
            setEmailErr("Please provide a valid email address!");
            valid = false;
        } else  setEmailErr("");

        if(!password.match(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>_\-\\\/[\]])[A-Za-z\d!@#$%^&*(),.?":{}|<>_\-\\\/[\]]{8,}$/)){
            setPasswordErr("Password must be 8 chars, include uppercase and symbol");
            valid = false;
        } else  setPasswordErr("");

        
        if(password !== password_r){
            setPassReErr("Passwords do not match");
            valid = false;
        } else  setPassReErr("");


        if( !valid ) return;

        console.log({

            "first_name" : first_name ,
            "last_name"  : last_name  ,
            "email"      : email      ,
            "passowrd"   : password

        }) ;
        
           const response =  await RegisterNewUser(first_name , last_name , email , password ) ;

         
           if( response.data ){
                
             navigate('/login');
             return ;

           }else{

              setServerError(" something went wrong !!! ");
                
           }
         




    }



    return (
        <div className="form-wrapper">
            <form className="register-form" onSubmit={handleSubmit}>

                <div className='input-wrapper'>
                    <label> First Name</label>
                    <input 
                        type="text" 
                        value={first_name}
                        onChange={(e)=>setFirstName(e.target.value)}
                        placeholder="First name" 
                    />
                    { name_err && <span style={{color:'red'}}>{name_err}</span> }
                </div>

                <div className='input-wrapper'>
                    <label> Last Name</label>
                    <input 
                        type="text" 
                        value={last_name}
                        onChange={(e)=>setLastName(e.target.value)}
                        placeholder="Last name" 
                    />
                    { last_err && <span style={{color:'red'}}>{last_err}</span> }
                </div>

                <div className='input-wrapper'>
                    <label> Email</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder="example@mail.com" 
                    />
                    { email_err && <span style={{color:'red'}}>{email_err}</span> }
                </div>

                <div className='input-wrapper'>
                    <label> Password </label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder="your password here" 
                    />
                    { pass_err && <span style={{color:'red'}}>{pass_err}</span> }
                </div>

                <div className='input-wrapper'>
                    <label> Repeat Password </label>
                    <input 
                        type="password"
                        value={password_r}
                        onChange={(e)=>setPasswordRe(e.target.value)}
                        placeholder="repeat password"
                    />
                    { pass_r_err && <span style={{color:'red'}}>{pass_r_err}</span> }
                </div>

                <div className='input-wrapper'>
                    <button type="submit">Register</button>
                    { server_err && <span style={{color:'red'}}>{server_err}</span> }
                </div>

            </form>
        </div>
    )
}

export default RegisterForm;
