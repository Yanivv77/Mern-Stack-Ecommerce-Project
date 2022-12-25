import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'yaniv@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Moshe cohen',
    email: 'moshe@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Avi levi',
    email: 'avi@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
