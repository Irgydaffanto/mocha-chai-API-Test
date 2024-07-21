import supertest from 'supertest';
import chai from 'chai';
const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const api = supertest('https://kasir-api.zelz.my.id');
let authToken;

before(async function() {
  const res = await api.post('/auth/login')
    .send({
      email: 'tokoirgy@example.com',
      password: 'asdf123$'
    });

  authToken = res.body.token;
});

describe('API Kontrak Kasir AJA', function() {

  it('should create a new item', async function() {
    const res = await api.post('/items')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'Item 1', price: 1000 });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
  });

  it('should retrieve an item', async function() {
    const itemId = 1; 
    const res = await api.get(`/items/${itemId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('id', itemId);
  });

  it('should update an item', async function() {
    const itemId = 1; 
    const res = await api.put(`/items/${itemId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'Updated Item', price: 1500 });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('name', 'Updated Item');
  });

  it('should delete an item', async function() {
    const itemId = 1; 
    const res = await api.delete(`/items/${itemId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).to.equal(204);
  });

});
