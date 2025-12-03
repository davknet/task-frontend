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
    console.log(received_data.token );
    const  uuid           = received_data.token;
    const  backendToken   = getBackendToken(uuid);  
    console.log(backendToken) ;
    const  user_id        = backendToken.userId;
    const  user           = getUser(user_id);
    const  token          = user.token;   


    const  endpoint = `http://127.0.0.1:8000/api/tasks?user_id=${user_id}`;


    try{
              let config = {
                method: method ,
                maxBodyLength: Infinity,
                url: endpoint ,
                headers: { 
                 'Authorization' : token  
                } ,
                data : ''
              };

         const response =  await  axios.request(config);
         return res.json(response.data);

    }catch(error)
    {

        console.error(error.message);
        res.status(500).json({ error: "something went wrong !!!" });

    }
});


// create 



app.post('/api/create' , async ( req , res ) => {

  const endpoint = 'http://127.0.0.1:8000/api/make/manager/create';
  const method   = 'POST';
  

});




app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


