var request = require('supertest');
describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('./apps/app').server;
  });
  afterEach(function () {
    server.close();
  });
  /*it('creates a user', ((done) => {
  request(server)
    .post('/user/create')
    .send({name: 'test', password: 'test', thumbnail: 'ricardo.jpeg'})
    .expect(201, done);
  }));*/
  it('doesn\'t create a user (no thumbnail)', ((done) => {
  request(server)
    .post('/user/create')
    .send({name: 'test2', password: 'test'})
    .expect(500, done);
  }));
  it('logs in a user', ((done) => {
  request(server)
    .post('/user/login')
    .send({name: 'test', pwd: 'test'})
    .expect(200, done);
  }));
  it('doesn\'t log in a user (wrong password)', ((done) => {
  request(server)
    .post('/user/login')
    .send({name: 'wrong', pwd: 'user'})
    .expect(500, done);
  }));
  it('404 a wrong route', ((done) => {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  }));
});
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNTQzZDgwNGM1NzFiMTJiYjJiMDZmYiIsIm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNTgyNTc5NjA3fQ.4Ln6SNTSbhiNOBW-YIAediXYECHmOqPbroO4IXhgP0M
//test
