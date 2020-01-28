'use strict';
 
const express=require('express'); //pulled an express
const app = express();            //assigned express to app
const logRequest=require('./logger');
const time = require('express-timestamp');


//***Global Midleware
app.use(express.json());   //use method say use this piece of middleware globally  
//express.json() means represnt my data as json format
app.use(logRequest);
// app.use(timestamp());
// app.use(time.init);


//***Basic Routings ****/
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
// post req
app.post('/categories',(req,res)=>{
    console.log('request body : ',req.body); //
    res.status(201).send('Good , the caoegory added')

})
app.post('/products',(req,res)=>{
    console.log('request body : ',req.body); //
    res.status(201).send('Good , the product added')

})
//

//middleware:
// function timestamp(){
//     console.log('time :'Math.floor(Date.now() / 1000))
//     return Math.floor(Date.now() / 1000)
//     // let moment = req.time
//     // console.log(moment.tz("America/Mexico_City").format());
//     //   logs moment in YYYY-MM-DDThh:mm:ss-05:00 format
// } 
// error middleware
function errorHandler(err,req,res,next){
    res.status(500);
    res.statusMessage='Server Error';
    res.json({error:err});
}
function notFoundHandler(req,res,next){
    res.status(404);
    res.statusMessage='Not Found';
    res.json({error:'Not Found'});
}

// Middleware to handle PUT and DELETE
app.use(methodOverride((request, response) => {
    if (request.body && typeof request.body === 'object' && '_method' in request.body) {
      // look in urlencoded POST bodies and delete it
      let method = request.body._method;
      delete request.body._method;
      return method;
    }
  }))
//Exportable server 
module.exports={             //object 
    server: app,             //contains exportable methods 
    start: port => {
        let PORT = port || process.env.PORT || 3000;
        app.listen(PORT,()=>console.log(`Listening on ${PORT}`));
    }
}
