import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import './style/style.css' ;
import TaskCard from "../cards/TaskCard";

const GetTasks = () => {

  const { user, token }         = useContext(AuthContext);
  const [tasks, setTasks]       = useState([]);
  const [ answers , setAnswers] = useState([]);
  const [ error, setError ]     = useState(null);

  useEffect(() => {

    const fetchTasks = async () => {
      try {

        const res = await axios.post("http://localhost:5000/api/tasks", {

          data: {
            token : token 
          }
        });

        

  
         setTasks(   res.data );
        

       



      }catch(err)
      {
         setError("Failed to fetch tasks");
      }
    };

    if (user && token) {
      fetchTasks();
    }

  }, [user, token]);

  return (
    <div className="tasks">
        <div className=""> 
            <h3>Your Tasks</h3>
            {!user && <div>You must be logged in.</div>}
            {error && <div>{error}</div>}
            {tasks.length === 0 && <div> No tasks found </div>}

   { tasks.length > 0 && 
       <div className="cards">

               { tasks.map( task => ( <TaskCard key={task.id} card={task} /> ) ) } 

       </div>
   }
          
           
      </div>
    </div>
  );

};

export default GetTasks;
