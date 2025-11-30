const express = require('express');
const axios   = require('axios');
const cors    = require('cors') ;



const app  = express() ;
const PORT = 5000 ;

app.use(cors({

    origin:'http://localhost:5173' 
}));





app.use(  express.json() );



app.post('api/all-tasks' , async ( req , res ) => {

    const { endpoint  , method = 'GET' ,  data = {} } = req.body ;

    console.log('received data' , {endpoint , method , data }) ;

    try
    {

        const response = await axios.post( endpoint , data );
        





        res.json(response.data ) ;

    }catch(error)
    {

         console.error(error.message) ;
         res.status(500).json({error : "something went wrong !!!" }) ;

    }




});











app.listen(PORT, () => {

 console.log(`Server running on http://localhost:${PORT}`);

});