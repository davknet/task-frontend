import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import './style/style.css' ;

const GetTasks = () => {

  const { user, token }         = useContext(AuthContext);
  const [tasks, setTasks]       = useState([]);
  const [answers, setAnswers ]  = useState([]);
  const [error, setError]       = useState(null);

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

          { tasks?.map(task => (
                   <div key={task.id} style={{ marginBottom: "20px" }}>
                       <h4>{task.title}</h4>
                       <p>Priority: {task.task_priority}</p>
                <div>
                  <strong>Answers:</strong>
                  {task.answers?.length > 0 ? (
                    task.answers.map((ans, index) => (
                      <div key={index} style={{ paddingLeft: "15px" }}>
                        {ans.answer || ans.value || JSON.stringify(ans)}
                      </div>
                    ))
                  ) : (
                    <div style={{ paddingLeft: "15px" }}>No answers yet</div>
                  )}
                </div>

  </div>
))}
           }
      </div>
    </div>
  );

};

export default GetTasks;
