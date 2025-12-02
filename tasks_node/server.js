const express               = require('express');
const axios                 = require('axios');
const cors                  = require('cors');
const app                   = express();
const PORT                  = 5000;
const { generateUserToken } = require('./tokenUtils.js');
const { addUser }           = require('./storageUtils.js');

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());



app.post('/api/login' , async(req , res ) => {

    const endpoint = 'http://127.0.0.1:8000/api/auth/login';
    const method   = 'POST';
    const {  data = {} } = req.body;

    console.log('received data', { endpoint, method, data });

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

    const endpoint = 'http://127.0.0.1:8000/api/auth/login';
    const method   = 'POST';


});







app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


