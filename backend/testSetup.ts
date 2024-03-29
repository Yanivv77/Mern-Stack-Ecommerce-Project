import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';


// declare global {
//   var login: () => Promise<string[]>;
// }

let mongo: any;
beforeAll(async () => {
  await mongoose.connection.close();
  mongo = await MongoMemoryServer.create();

  process.env.JWT_SECRET = 'a2sd2fj';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
  
});


// global.login = async () => {
//   const username = 'test';
//   const email = 'test@test.com';
//   const password = 'password';
//   const age = 14;

//   const response = await request(app)
//     .post('/api/users/signup')
//     .send({
//       username,
//       email,
//       password,
//       age
//     })
//     .expect(201);

//   const cookie = response.get('Set-Cookie');

//   return cookie;
// }