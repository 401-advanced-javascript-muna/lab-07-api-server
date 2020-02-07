'use strict ';

const uuid = require('uuid/v4');  //To create an id

class Model {

  constructor() {
    this.database = [];
  }


  //CRUD METHODS GET/CREATE /UPDATE/DELETE

  get(id) {
    let response = id ? this.database.filter((record) => record.id === id) : this.database;
    return Promise.resolve(response);
  }

  create(record) {
    record.id = uuid();
    this.database.push(record);
    return Promise.resolve(record);
  }
  update(id, record) {
    this.database = this.database.map((item) => (item.id === id) ? record : item);
    return Promise.resolve(record);
  }


  delete(id) {
    this.database = this.database.filter((record) => record.id !== id);
    return Promise.resolve();
  }

}

module.exports = Model;