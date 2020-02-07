/* eslint-disable no-unused-vars */
'use strict ';

module.exports = (error, req, res, next ) => {
  res.status(500);
  res.statusMessage = 'There is an Server Error';
  res.json({error:error});
};