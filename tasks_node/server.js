const express               = require('express');
const axios                 = require('axios');
const cors                  = require('cors');
const app                   = express();
const PORT                  = 5000;
const { generateUserToken , getBackendToken } = require('./tokenUtils.js');
const { addUser , getUser  }                  = require('./storageUtils.js');

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.post('/api/login' , async(req , res ) => {

    const endpoint = 'http://127.0.0.1:8000/api/auth/login';
    const method   = 'POST';
    const {  data = {} } = req.body;

    // console.log('received data', { endpoint, method, data });

    try {
       
        const response     = await axios.post(endpoint, data);
        const user         = response.data.user ;
        const origin_token = response.data.token ;      
        const uuid         = generateUserToken( user.id );
       
        addUser( user.id , user , origin_token );

       const new_data = {
         "user" : {
             "name"  : user.name ,
             "email" : user.email 
         },
         "token"     : uuid 
        };
        res.json( new_data );
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "something went wrong !!!" });
    }
});


/**
 *   register  
 *  
 */


app.post('/api/register', async (req , res ) => {

    const endpoint       = 'http://127.0.0.1:8000/api/auth/register';
    const method         = 'POST';
    const data           = req.body;


  try {

    // console.log(req.body);

      let config = {
                  method: method ,
                  maxBodyLength: Infinity,
                  url: endpoint ,
                  headers: { 
                    'Content-Type'  : 'application/json'
                  },
                  data : req.body 
                 };
      const   response =   await axios.request(config);


      const data_to_return =  {

         "success" : response.data.success ,
         "message" : response.data.message 

        };

        // console.log(data_to_return) ;

      return res.json( data_to_return );
  }catch(error)
  {
        console.error(error.message);
        res.status(500).json({ error: "something went wrong !!!" });
  }
});





app.post('/api/tasks' , async (req , res ) => {

   
    const  method         = 'GET' ;
    const  received_data  = req.body.data ;
       // console.log( received_data.token );
    const  uuid           = received_data.token;
    const  backendToken   = getBackendToken(uuid);  
      // console.log( backendToken );
    const  user_id        = backendToken.userId;
    const  user           = getUser( user_id );
    const  token          = user.token;   


    const  endpoint = `http://127.0.0.1:8000/api/tasks?user_id=${user_id}` ;


    try{
              let config = {
                method: method ,
                maxBodyLength : Infinity,
                url: endpoint ,
                headers: { 

                 'Authorization' :  `Bearer ${token}` 
                } ,
                data : ''
              };

         const response  =  await axios.request( config );

         return res.json( response.data );

    }catch( error )
    {

        console.error(error.message);
        res.status(500).json({ error: "something went wrong !!!" });

    }
});


// create 



app.post('/api/create' , async ( req , res ) => {

            const endpoint = 'http://127.0.0.1:8000/api/make/manager/create';
            const method   = 'POST';
            const data     = req.body.data ;
            const uuid         = data.token;
            const backend_uuid = getBackendToken(uuid);
            const user_id      = backend_uuid.userId;
            const user         = getUser(user_id);
            const token        = user.token   ;



 

   try{

                      let data_1 = JSON.stringify({
                        "s_time": new Date().toISOString().slice(0, 19).replace("T", " ") ,
                        "user_id": user_id ,
                        "task_id": data.task_id,
                        "priority_id": data.priority_id ,
                        "status_id": data.status_id ,
                        "answer_id": null
                      });


                      if (!token || token.length < 10) {
                        console.error("❌ EMPTY TOKEN — STOP REQUEST");
                        return res.status(401).json({ error: "Invalid Laravel token" });
                      }

                   let config = {
                                  method: 'post',
                                  maxBodyLength: Infinity,
                                  url: 'http://127.0.0.1:8000/api/make/manager/create',
                                  headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`  
                                  },
                                  data : data_1
                                };



      

                  const response   =  await  axios.request(config);

                  console.log(response);
                  
                  return res.json(response.data);

                }catch(error)
                {
                      console.error(error.message);
                      res.status(500).json({ error: "something went wrong !!!" });
                }

              });



app.post("/api/update" , async ( req ,  res ) => {

 
      const method   = 'PATCH' ;
      const data     = req.body.data ;
      console.log( req.body   );
      const uuid     = data.token;
      const row_id   = data.task_id  ;

      // console.log({   uuid : uuid });
      // console.log({ row_id : row_id });


      const backend_uuid = getBackendToken(uuid);
      // console.log({ backend_uuid : backend_uuid });
      const user_id  = backend_uuid.userId;
      // console.log({ user_id : user_id});
      const user     = getUser(user_id);
      // console.log({ user : user });
      const token    = user.token;
      console.log({ token : token });
      const endpoint = `http://127.0.0.1:8000/api/make/manager/update/${row_id}/status`;

        try{

        let   new_data = JSON.stringify({

          "user_id": user_id ,
          "status": "completed"

        });


        // console.log({ new_data : new_data });

       let config = {
                        method: method,
                        maxBodyLength: Infinity,
                        url: endpoint,
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${token}`  
                        },
                        data: new_data
                      };

           const response = await axios.request( config ); 

           res.json(response.data);

        }catch(error)
        {
             console.error(error.message);
             res.status(500).json({ error: "something went wrong !!!" });
        }
   



});












app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


