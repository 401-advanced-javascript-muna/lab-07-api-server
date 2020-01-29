

const express = require('express'); //pulled an express
const app = express();            //assigned express to app
const logRequest = require('./logger.js');


//***Global Midleware
app.use(express.json());   //use method say use this piece of middleware globally
//express.json() means represnt my data as json format
app.use(logRequest);

//middleware function

function timestamp(){
  return (req, res, next) => {
    let d = new Date().toLocaleDateString('en-US');
    let t = new Date().toLocaleTimeString('en-US');

    console.log(' Date and time : ' , d,t);
    req.time = d + ' ' + t ; //Date.now(30 * 1000)/1000 ;//) * 1000).toDateString();

    next();
  };
}
//Middleware route
app.get('/mw',timestamp(),(req,res)=>{
  let output = {
    time: req.time,

  };
  res.status(200).json(output);
});

// //***Basic Routings ****/
//categories
app.get('/categories', timestamp(), (req, res) => {
  let output = {
    type:req.query.type,
    time: req.time,
  };

  res.status(200).json(output);
});

app.post('/categories',timestamp,(req,res)=>{
  console.log('request body : ',req.body);
  res.status(201).send('Good , the caoegory added');

});

//Products
app.get('/products',timestamp(),(req,res)=>{
  let output = {
    type: req.query.type,
    time: req.time,

  };
  res.status(200).json(output);
});


app.post('/products',timestamp,(req,res)=>{
  console.log('request body : ',req.body);
  res.status(201).send('Good , the product added');

});


//get error
app.get('/error',(req,res)=>{
  throw new Error('Real-time-error');
});

// error middleware
function errorHandler(err,req,res,next){
  res.status(500);
  res.statusMessage = 'Server Error';
  res.json({error:err});
}
function notFoundHandler(req,res,next){
  res.status(404);
  res.statusMessage = 'Not Found';
  res.json({error:'Not Found'});
}
//API Route:  return json
let db = [];
//categoties
app.get('/api/v1/categoties') ,timestamp,(res,req,next)=>{
  // google implement /api/v1/categoties
  let count = db.length;
  let results = db; //get all db
  res.json({count,results});
};
app.get('/api/v1/categoties') ,timestamp,(res,req,next)=>{
  // google implement /api/v1/categoties
  // example of request http://localhost:3000/api/v1/food/23
  // request.params === ['23']
  // request.params.id === '23'
  let id = req.params.id; //get by id
  let record = db.filter((record)=>record.id === parseInt(id).res.json(record));

};
app.post('/api/v1/categoties',timestamp,(req,res,next)=>{
  let {name} = req.body;//req.body.name
  let record = {name};
  record.id = db.length + 1;
  db.push(record);
  res.status(201).json(record);

});
app.put('/api/v1/categoties/:id',timestamp, (req, res, next) => {
  let idToUpdate = req.params.id;
  let { name, id } = req.body;
  let updatedRecord = { name, id };
  db = db.map((record) => (record.id === parseInt(idToUpdate)) ? updatedRecord : record);
  res.json(updatedRecord);
});

app.delete('/api/v1/categoties/:id',timestamp, (req, res, next) => {
  let id = req.params.id;
  db = db.filter((record) => record.id !== parseInt(id));
  res.json({ msg: 'item deleted' });
});
//products
app.get('/api/v1/products') ,timestamp,(res,req,next)=>{
  // google implement /api/v1/categoties

  let count = db.length;
  let results = db;
  res.json({count,results});

};
app.get('/api/v1/products') ,timestamp,(res,req,next)=>{
  // google implement /api/v1/categoties
  // example of request http://localhost:3000/api/v1/food/23
  // request.params === ['23']
  // request.params.id === '23'
  let id = req.params.id;
  let record = db.filter((record)=>record.id === parseInt(id).res.json(record));

};
app.post('/api/v1/products',timestamp,(req,res,next)=>{
  let {name} = req.body;//req.body.name
  let record = {name};
  record.id = db.length + 1;
  db.push(record);
  res.status(201).json(record);

});
app.put('/api/v1/products/:id',timestamp, (req, res, next) => {
  let idToUpdate = req.params.id;
  let { name, id } = req.body;
  let updatedRecord = { name, id };
  db = db.map((record) => (record.id === parseInt(idToUpdate)) ? updatedRecord : record);
  res.json(updatedRecord);
});

app.delete('/api/v1/products/:id',timestamp,(req, res, next) => {
  let id = req.params.id;
  db = db.filter((record) => record.id !== parseInt(id));
  res.json({ msg: 'item deleted' });
});


//Exportable server
module.exports = {             //object
  server: app,             //contains exportable methods
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT,()=>console.log(`Listening on ${PORT}`));
  },
};
