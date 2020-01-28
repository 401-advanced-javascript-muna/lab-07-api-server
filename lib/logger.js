'use strict';

module.exports = (req,res,next)=>{
    console.log('request info:',req.method,req.path);
    console.log('Time is :',req.time)
    next(); // if there is any middleware go to the next on the chain but if not finish 
}