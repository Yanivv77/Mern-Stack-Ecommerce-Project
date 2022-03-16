import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Moshe cohen',
    email: 'cohen@cohen.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Avi levi',
    email: 'levi@levi.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
