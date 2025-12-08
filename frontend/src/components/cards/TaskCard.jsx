import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './style/task-cards.css';
import UpdateTask from "../context/UpdateTask";   
import CreateSpecificTask from '../context/CreateSpecificTask';
const TaskCard = ({ card }) => {

    const { user, token } = useContext(AuthContext);   

    const saveTask = async ( id , task_id , status_id , priority_id ) => {


         const res = await CreateSpecificTask( user , token ,  id , task_id , status_id , priority_id );

      console.log( " CreateSpecificTask response " , res ) ;

         if( res )
          {

            const response = await UpdateTask( id , task_id , user , token );

                if( response )
                {

                }
                
          }else 
         {

            console.log("Error saving task" , res ); 


         }
    };

    return (
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
                                    value={ans.answer_text}
                                    onChange={() =>
                                        saveTask( ans.id, ans.task_id , 1 , card.priority.id   )
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
    );
};

export default TaskCard;
