import {db} from '@lib/db'
import {User} from '@prisma/client'
import bcrypt from 'bcrypt'
import {jwtVerify, SignJWT} from 'jose'

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10)
}

export const comparePasswords = (
  plainTextPassword: string,
  hashedPassword: string,
) => bcrypt.compare(plainTextPassword, hashedPassword)

export const createJWT = (user: User) => {
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + 60 * 60 * 24 * 7

  return new SignJWT({payload: user})
    .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET))
}

export const validateJWT = async (jwt: string) => {
  const {payload} = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET),
  )

  return payload.payload as User
}

export const getCookieName = () => {
  const cookieName = process.env.COOKIE_NAME

  if (!cookieName) throw new Error('COOKIE_NAME undefined')

  return cookieName
}

export const getUserFromCookie = async (cookies: any) => {
  const jwt = cookies.get(getCookieName())

  const {id} = await validateJWT(jwt.value)

  const user = await db.user.findUnique({
    where: {
      id: id,
    },
  })

  return user
}
