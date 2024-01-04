import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { getPetById } from './get-pet-by-id'
import { findPets } from './find-pets'

export async function petsRoutes(app: FastifyInstance) {
  // app.addHook('onRequest', verifyJwt)

  app.post('/pets', { preHandler: [verifyJwt] }, create)
  app.get('/pets', findPets)

  app.get('/pets/:id', getPetById)
}
