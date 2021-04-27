process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/index.js');
const knex = require('../../src/db/connection');

const { expect } = chai;

chai.use(chaiHttp);

describe('Todos API', () => {
  beforeEach(() =>
    knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run()),
  );

  afterEach(() => knex.migrate.rollback());

  it('should support fetching all todos', async () => {
    const result = await chai.request(server).get('/todos');

    expect(result.status).to.equal(200);
    expect(result.type).to.equal('application/json');
    expect(result.body.status).to.equal('success');
    expect(result.body.data).to.eql([
      { id: 1, name: 'Do groceries' },
      { id: 2, name: 'Make homework' },
    ]);
  });

  it('should support fetching a single todo item', async () => {
    const result = await chai.request(server).get('/todos/1');

    expect(result.status).to.equal(200);
    expect(result.type).to.equal('application/json');
    expect(result.body.status).to.eql('success');
    expect(result.body.data).to.eql({ id: 1, name: 'Do groceries' });
  });

  it('should support creating a todo item', async () => {
    const resultPost = await chai.request(server).post('/todos').send({ name: 'Feed the dog!' });
    expect(resultPost.status).to.equal(201);
    expect(resultPost.type).to.equal('application/json');
    expect(resultPost.body.status).to.eql('success');
    expect(resultPost.body.data).to.eql({ id: 3, name: 'Feed the dog!' });

    const result = await chai.request(server).get('/todos');
    expect(result.status).to.equal(200);
    expect(result.type).to.equal('application/json');
    expect(result.body.status).to.eql('success');
    expect(result.body.data).to.eql([
      { id: 1, name: 'Do groceries' },
      { id: 2, name: 'Make homework' },
      { id: 3, name: 'Feed the dog!' },
    ]);
  });

  it('should support updating a todo item', async () => {
    const resultUpdate = await chai.request(server).put('/todos/1').send({ name: 'Do groceries!' });
    expect(resultUpdate.status).to.equal(200);
    expect(resultUpdate.type).to.equal('application/json');
    expect(resultUpdate.body.status).to.eql('success');

    const result = await chai.request(server).get('/todos/1');
    expect(result.status).to.equal(200);
    expect(result.type).to.equal('application/json');
    expect(result.body.status).to.eql('success');
    expect(result.body.data).to.eql({ id: 1, name: 'Do groceries!' });
  });

  it('should support deleting a todo item', async () => {
    const resultDelete = await chai.request(server).delete('/todos/1');
    expect(resultDelete.status).to.equal(200);
    expect(resultDelete.type).to.equal('application/json');
    expect(resultDelete.body.status).to.eql('success');
    expect(resultDelete.body.data).to.eql({ id: 1, name: 'Do groceries' });

    const result = await chai.request(server).get('/todos/1');
    expect(result.status).to.equal(404);
    expect(result.type).to.equal('application/json');
    expect(result.body.status).to.eql('error');
  });
});
