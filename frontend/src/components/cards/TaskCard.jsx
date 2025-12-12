import { useContext ,useState  } from 'react';
import { AuthContext } from '../context/AuthContext';
import './style/task-cards.css';
import UpdateTask from "../context/UpdateTask";   
import CreateSpecificTask from '../context/CreateSpecificTask';
import Alert from '../alerts/Alert';
const TaskCard = ({ card }) => {

    const { user, token } = useContext(AuthContext);  
    const [ alertMessage , setAlertMessage ] = useState("");
    const [ showAlert    , setShowAlert    ] = useState(false); 
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const saveTask = async (  task_id , status_id , priority_id , answer_id ) => {

          const prevSelection = selectedAnswer;
          setSelectedAnswer(answer_id);

    try{ 

             const res      = await CreateSpecificTask( user , token ,   task_id , status_id , priority_id , answer_id );

             console.log(" Specific Task Created : ", res );


             if( res.success == 'ok'  )
            {



             
             const response = await UpdateTask( res.response.last_id  , task_id , user , token );



                if( response )
                {
                    setAlertMessage("Task saved successfully!");
                    setShowAlert(true);
                }

            }

        }catch(err)
        {

                    
                    console.log(" Error in saving task : " , err );

                    const message = err?.response.data.error.priority_id[0]
                        ? err.response.data.error.priority_id[0] 
                        : "Something went wrong";

                    setAlertMessage(message);
                    setShowAlert(true);
                    setSelectedAnswer(prevSelection); 

               
        }
    }
     


    return (
       <>
          <Alert 
                show={showAlert} 
                message={alertMessage} 
                onClose={() => setShowAlert(false)} 
            />
        <div className="card">
            <div className="question">
                <h5>{card.title}</h5>
            </div>

            <div className="priority">
                <p><i>Priority</i>: {card.task_priority}</p>
            </div>

            <div className="answers">
                <p>Choose answer:</p>

                <div className="radio">
                    <form>
                        {card.answers?.map((ans, index) => (
                            <div key={ans.id}>   
                                <input
                                    type="radio"
                                    id={`ans-${card.id}-${index}`}
                                    name={`card-${card.id}`}
                                    checked={selectedAnswer === ans.id}
                                    value={ans.answer_text}
                                    onChange={() =>
                                        saveTask(  ans.task_id , 1 , card.priority.id  , ans.id )
                                    }
                                />
                                <label htmlFor={`ans-${card.id}-${index}`}>
                                    {ans.answer_text}
                                </label>
                            </div>
                        ))}
                    </form>
                </div>
            </div>
        </div>
        </>
    );
};

export default TaskCard;
