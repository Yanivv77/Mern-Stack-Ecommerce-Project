import jwt from 'jsonwebtoken'


const generateToken = (id: string): string => {
  if (process.env.JWT_SECRET) 
    {
      return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '30d',} )
    }
    else {
      throw new Error('JWT_SECRET is not defined')
    }
  }



export default generateToken