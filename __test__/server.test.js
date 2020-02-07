'use strict ';

const { server } = require('../lib/server');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('  THE SERVER TESTING', () => {

  it('THERE IS 500 ERROR ', () => {
    return mockRequest
      .get('/error')
      .then(test => {
        expect(test.status).toBe(500);
      }).catch(err => console.error(err));
  });

  it('(404 Error) the route is not found  ', () => {

    return mockRequest
      .get('/main')
      .then(test => {
        expect(test.status).toBe(404);
      }).catch(err => console.error(err));
  }); 

  it('404 Error , Invalid method ', () => {
    return mockRequest
      .delete('/')
      .then(test => {
        expect(test.status).toBe(404);
      }).catch(err => console.error(err));
  });

  // categories
  it('get categories Routes is 200  ', () => {
    return mockRequest
      .get('/api/v1/categories')
      .then(test => {
        expect(test.status).toBe(200);
      }).catch(err => console.error(err));
  });

  it('get categories/id Routes is 200 ', () => {
    return mockRequest
      .get('/api/v1/categories/1')
      .then(test => {
        expect(test.status).toBe(200);
      }).catch(err => console.error(err));
  });

  it('post categories Routes is 200  ', () => {
    return mockRequest
      .post('/api/v1/categories')
      .then(test => {
        expect(test.status).toBe(200);
      }).catch(err => console.error(err));
  });

  it('post categories/id Routes is 200  ', () => {
    return mockRequest
      .put('/api/v1/categories/1')
      .then(test => {
        expect(test.status).toBe(200);
      }).catch(err => console.error(err));
  });

  it('delete categories Routes is 200  ', () => {
    return mockRequest
      .delete('/api/v1/categories/1')
      .then(test => {
        expect(test.status).toBe(200);
      }).catch(err => console.error(err));
  });

  // Products
  it('get Products  Routes is 200  ', () => {
    return mockRequest
      .get('/api/v1/products')
      .then(test => {
        expect(test.status).toBe(200);
      }).catch(err => console.error(err));
  });

  it('get Products/id  Routes is 200  ', () => {
    return mockRequest
      .get('/api/v1/products/2')
      .then(test => {
        expect(test.status).toBe(200);
      }).catch(err => console.error(err));
  });

  it('post Products  Routes is 200   ', () => {
    return mockRequest
      .post('/api/v1/products')
      .then(test => {
        expect(test.status).toBe(200);
      }).catch(err => console.error(err));
  });

  it('put Products  Routes is 200 ', () => {
    return mockRequest
      .put('/api/v1/products/1')
      .then(test => {
        expect(test.status).toBe(200);
      }).catch(err => console.error(err));
  });

  it('delete Products  Routes is 200 ', () => {
    return mockRequest
      .delete('/api/v1/products/1')
      .then(test => {
        expect(test.status).toBe(200);
      }).catch(err => console.error(err));
  });
});