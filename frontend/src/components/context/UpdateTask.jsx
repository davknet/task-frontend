import axios from "axios";






const UpdateTask = async ( id, task_id, user , token ) => {

    if (!user || !token) return null;

    const endpoint = "http://localhost:5000/api/update" ;

    console.log( id , task_id );

    const response = await axios.post( endpoint , { data : {

        id: id,
        task_id: task_id,
        token: token
        
    }} 
  );

    return response.data;
};

export default UpdateTask;
