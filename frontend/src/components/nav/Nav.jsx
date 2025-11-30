import { Link } from "react-router-dom";
import LoginNav from "./LoginNav";
import './style/style.css' ;










const Nav = () => {



    return (


             <nav className="main-navigation">
                     
                  <ul className="menu">

                         <li><Link to="/" className="link" id="">Home</Link></li>
                         <li><Link to="/tasks" className="link" id="">Tasks</Link></li>
                         <li><Link to="/create" className="link" id="">Create</Link></li>

                  </ul>
                  <LoginNav />
             </nav>
    )

}







export default Nav ;