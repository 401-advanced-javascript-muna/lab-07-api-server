/* eslint-disable no-unused-vars */
'use strict ';


const express = require('express');

const app = express();

const loggerReq = require('../middleware/logger');

// TO USE MIDDLEWARES
app.use(loggerReq);

app.use(express.json());

/////////////////////////////BASIC ROUTING

/////////////////////// CATEGORY BASIC ROUTING

app.get('/categories',(req, res) => {
  console.log('req.query : ', req.query);
  let output = {
    type: req.query.type,
  };
  res.status(200).json(output);
});
app.post('/categories', (req, res) => {
  console.log('req.body : ', req.body);
  res.status(201).json('THE CATEGORY IS ADDED ');

});

//////////////////// ProductsRoutes
app.get('/products', (req, res) => {
  console.log('req.query : ', req.query);
  let output = {
    type: req.query.type,
  };
  res.status(200).json(output);
});

app.post('/products',timestamp(), (req, res) => {
  console.log(' req.body : ', req.body);
  res.status(201).json(' THE PRODUCT IS ADDED ');

});

//////////////////MiddleWare

function timestamp() {
  return (req, res, next) => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    req.requestTime = 'THE DATE   :' + date + '    THE TIME : ' + time;
    console.log('THE DATE AND THE TIME IS : ', req.requestTime);
    next();
  };

}

app.get('/middleware', timestamp(), (req, res) => {
  let output = {
    requestTime: req.requestTime,
  };
  res.status(200).json(output);

});


///////////////////////////////////// Errors

function errorHander(error, req, res, next) {
  res.status(500);
  res.Msg = 'THE ERROR ON THE SERVER ';
  res.json({ error: error });
}
function notFoucnError(req, res, next) {
  res.status(404);
  res.Msg = ' NOT FOUND 404  ';
  res.json({ error: ' NOT FOUND  404' });
}
app.get('/error',timestamp(), (req, res) => {
  throw new Error('GENERATE AN Error ');
});

//////////////////////////////////////////// ROUTES /////////////////////////////////////////
let db = [];
//////////////// categories routes
app.get('/api/v1/categories',timestamp(), (req, res, next) => {
  let count = db.length;
  let results = db;
  res.json({ count, results });
});

app.get('/api/v1/categories/:id',timestamp(), (req, res, next) => {
  let id = req.params.id;
  let record = db.filter(record => record.id === parseInt(id));
  res.json(record);
});

app.post('/api/v1/categories',timestamp(), (req, res, next) => {
  let { name } = req.body;
  let record = { name };
  record.id = db.length + 1;
  db.push(record);
  res.json(record);
});

app.put('/api/v1/categories/:id',timestamp(), (req, res, next) => {
  let idUpdate = req.params.id;
  let { name, id } = req.body;
  let recordToUpdate = { name, id };
  db = db.map((record) => (record.id === parseInt(idUpdate)) ? recordToUpdate : record);
  res.json(recordToUpdate);
});

app.delete('/api/v1/categories/:id',timestamp(), (req, res, next) => {
  let idDelete = req.params.id;
  db = db.filter(record => record.id !== parseInt(idDelete));
  res.json({ message: ' the category is deleted' });
});


////////////////////products route

app.get('/api/v1/products',timestamp(),(req, res, next) => {
  let count = db.length;
  let results = db;
  res.json({ count, results });
});
app.get('/api/v1/products/:id',timestamp(), (req, res, next) => {
  let id = req.params.id;
  let record = db.filter(record => record.id === parseInt(id));
  res.json(record);
});

app.post('/api/v1/products',timestamp(), (req, res, next) => {
  let { name } = req.body;
  let record = { name };
  record.id = db.length + 1;  //the database will increase 1
  db.push(record);
  res.json(record);
});

app.put('/api/v1/products/:id',timestamp(), (req, res, next) => {
  let idToUpdate = req.params.id;
  let { name, id } = req.body;
  let recordToUpdate = { name, id };
  db = db.map((record) => (record.id === parseInt(idToUpdate)) ? recordToUpdate : record);
  res.json(recordToUpdate);
});

app.delete('/api/v1/products/:id', timestamp(),(req, res, next) => {
  let idDelete = req.params.id;
  db = db.filter(record => record.id !== parseInt(idDelete));
  res.json({ message: 'The Product is Deleted' });
});

//Exportable server
module.exports = {   //object contains exportable methods
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(` listening on port No.${PORT}`));
  },
};
