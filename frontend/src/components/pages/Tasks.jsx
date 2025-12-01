import { useState ,  } from "react";
import { AuthContext } from "../context/AuthContext";
import GetTasks from "../context/GetTasks";












const Tasks = () => {


    return (

        <>
            <div className="tasks">

               <GetTasks />      
                  
            </div>
        </>
    )
}





export default  Tasks ;