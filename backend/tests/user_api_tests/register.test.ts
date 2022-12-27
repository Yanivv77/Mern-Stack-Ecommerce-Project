import request from 'supertest';
import app from '../../server';
import {User} from '../../models/userModel'

// describe('POST /api/users', () => {
//   it('returns a 201 and a token on successful registration', async () => {
//     const res = await request(app)
//       .post('/api/users')
//       .send({ name: 'Testuseryyy', email: 'testyyy@example.com', password: 'password' });
//     expect(res.status).toBe(201);
//     expect(res.body).toHaveProperty('name', 'Testuseryyy');
//     expect(res.body).toHaveProperty('email', 'testyyy@example.com');
//     expect(res.body).toHaveProperty('isAdmin', false);
//     expect(res.body).toHaveProperty('token');

//   },20000);
// });

  it('returns a 400 on email already in use', async () => {
await request(app)
      .post('/api/users')
      .send({ name: 'TestUser', email: 'test@example.com', password: 'password' });

    const res = await request(app)
      .post('/api/users')
      .send({ name: 'TestUser', email: 'test@example.com', password: 'password' });

    
    expect(res.body.message).toBe('User already exists');
  },20000);

  it('returns a 500 on invalid user data', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: '', email: 'invalid', password: 'short' });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('User validation failed: name: Path `name` is required.');
  },20000);
  
  export { app };