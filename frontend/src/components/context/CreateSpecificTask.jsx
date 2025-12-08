import axios from "axios";

const CreateSpecificTask = async ( user, token, id, task_id, status_id, priority_id) => {
  const endpoint = "http://localhost:5000/api/create";

  try {
    if ( !user || !token ) {
      console.log("No user or token provided");
      return null;
    }

    const response = await axios.post( endpoint , { data :  {

      "user"        : user  ,
      "token"       : token ,
      "id"          : id    ,
      "task_id"     : task_id     ,
      "status_id"   : status_id   ,
      "priority_id" : priority_id ,
      "answer_id"   : null  
    }} 
  );

    return response.data;



  } catch (err) {
    console.log("Error creating specific task", err);
    return null;
  }
};

export default CreateSpecificTask;
