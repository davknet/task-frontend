import { BrowserRouter as Router , Routes , Route  } from "react-router-dom" ;
import './App.css';
import Header from './components/header/Header';
import Home from "./components/pages/Home";
import Tasks from "./components/pages/Tasks";
import Create from "./components/pages/Create";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { AuthProvider } from "./components/context/AuthContext";

function App() {

  return (
    <>


    <AuthProvider>

       <Router>
                   
      
           <Header />
            <div className='container'>
                  <Routes>
                      <Route path="/" element={<Home/>}/>
                      <Route path="/tasks" element={<Tasks/>}/>
                      <Route path="/create" element={<Create/>}/>
                      <Route path="/login" element={<Login/>}/>
                      <Route path="/Register" element={<Register/>}/>

                  </Routes>
            </div>

         </Router>

         </AuthProvider>
      

    </>
  )
}

export default App
