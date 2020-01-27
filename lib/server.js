'use strict';

const express=require('express'); //pulled an express
const app = express();            //assigned express to app

//***Global Midleware
app.use(express.json());   //use method say use this piece of middleware globally  
//express.json() means represnt my data as json format


//***Routings ****/
app.get('/products',(req,res)=>{
    let output={
        type: req.query.type
    }
    res.status(200).json(output);
    })

app.get('/categories',(req,res)=>{
    let output={
        type: req.query.type
    }
    res.status(200).json(output);
    })

//Exportable server 
module.exports={             //object 
    server: app,             //contains exportable methods 
    start: port => {
        let PORT = port || process.env.PORT || 3000;
        app.listen(PORT,()=>console.log(`Listening on ${PORT}`));
    }
}
