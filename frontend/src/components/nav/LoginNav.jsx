
import { Link } from 'react-router-dom';
import './style/login-nav.css' ;





const LoginNav = () => {


    return (

        <>
           <ul className="second-menu">
                <li><Link to="/login" className="item" id="">Login</Link></li>
                <li><Link  to="/register"  className="item" id="">Register</Link></li>
           </ul> 
        </>
    )
}




export default LoginNav ;