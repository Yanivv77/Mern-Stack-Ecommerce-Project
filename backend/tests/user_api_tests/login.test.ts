import request from 'supertest';
import app from '../../server';

describe('POST /api/users/login', () => {
    // it('returns a 200 and a token on successful login', async () => {
    //    await request(app)
    //   .post('/api/users')
    //   .send({ name: 'test', email: 'testtest@example.com', password: 'password' });

    //   const res = await request(app)
    //     .post('/api/users/login')
    //     .send({ email: 'testtest@example.com', password: 'password' });
  
    //   expect(res.status).toBe(200);
      
    // },20000);
  
    it('returns a 401 on invalid email', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({ email: 'invalid@example.com', password: 'password' });
  
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Invalid email or password');
    },20000);
  
    it('returns a 401 on invalid password', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({ email: 'test@example.com', password: 'invalid' });
  
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Invalid email or password');
    },20000);
  });






// it('returns a 201 on successful signup', async () => {
//   return request(app)
//     .post('/api/users/signup')
//     .send({
//       username : "test",
//       email: 'test@test.com',
//       password: 'password',
//       age: 14
//     })
//     .expect(201);
// });

// it('returns a 400 with an invalid email', async () => {
//   return request(app)
//     .post('/api/users/signup')
//     .send({
//       username : "test",
//       email: 'al2kdf2la2skj2fd',
//       password: 'password',
//       age : 14
//     })
//     .expect(400);
// });

// it('returns a 400 with an invalid password', async () => {
//   return request(app)
//     .post('/api/users/signup')
//     .send({
//       username : "test",
//       email: 'al2skd2fl2ask2jfd',
//       password: 'p',
//       age : 14
//     })
//     .expect(400);
// });

// it('returns a 400 with missing email and password', async () => {
//   await request(app)
//     .post('/api/users/signup')
//     .send({
//       email: 'test@test.com'
//     })
//     .expect(400);

//   await request(app)
//     .post('/api/users/signup')
//     .send({
//       password: 'alskjdf'
//     })
//     .expect(400);
// });

// it('disallows duplicate emails', async () => {
//   await request(app)
//     .post('/api/users/signup')
//     .send({
//       username : "test",
//       email: 'test@test.com',
//       password: 'password',
//       age : 14
//     })
//     .expect(201);

//   await request(app)
//     .post('/api/users/signup')
//     .send({
//       username : "test",
//       email: 'test@test.com',
//       password: 'password',
//       age : 14
//     })
//     .expect(400);
// });

// it('sets a cookie after successful signup', async () => {
//   const response = await request(app)
//     .post('/api/users/signup')
//     .send({
//       username : "test",
//       email: 'test@test.com',
//       password: 'password',
//       age: 14
//     })
//     .expect(201);

//   expect(response.get('Set-Cookie')).toBeDefined();
// }
// );