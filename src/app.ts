import { fastifyJwt } from '@fastify/jwt'
import fastify from 'fastify'
import { env } from './env'
import { usersRoutes } from './http/controllers/users-controllers/routes'
import fastifyCookie from '@fastify/cookie'
import { petsRoutes } from './http/controllers/pets-controllers/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(petsRoutes)
