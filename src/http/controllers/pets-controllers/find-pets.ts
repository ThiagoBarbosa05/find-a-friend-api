import { prisma } from '@/lib/prisma'
import { makeGetPetsByCityUseCase } from '@/use-cases/factories/make-get-pets-by-city-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findPets(req: FastifyRequest, reply: FastifyReply) {
  try {
    const querySchema = z.object({
      city: z.string(),
    })

    const { city } = querySchema.parse(req.query)

    const getPetsByCityUseCase = makeGetPetsByCityUseCase()

    const { petsByCity } = await getPetsByCityUseCase.execute(city)

    return reply.send({ petsByCity })
  } catch (err) {
    console.log(err)
  }
}
