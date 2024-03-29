import jwt from 'jsonwebtoken'

export const signToken = (_id: string, email: string) => {
  if(!process.env.JWT_SECRET_SEED) {
    throw new Error('JWT_SECRET_SEED is not defined')
  }

  return jwt.sign({
    _id,
    email
  }, process.env.JWT_SECRET_SEED, {
    expiresIn: '30d'
  })
}

export const isValidToken = (token: string):Promise<string> => {
  if(!process.env.JWT_SECRET_SEED) {
    throw new Error('JWT_SECRET_SEED is not defined')
  }

  if(token.length <= 0) {
    return Promise.reject('Token is empty')
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
        if(err) {
          reject('JWT is not valid')
        }

        const {_id} = payload as {_id: string}

        resolve(_id)

      })
      resolve(token)
    } catch (error) {
      reject('JWT is not valid')
    }
  })
}