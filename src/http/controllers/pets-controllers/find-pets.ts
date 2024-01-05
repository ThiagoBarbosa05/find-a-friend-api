import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFindPetsUseCase } from '@/use-cases/factories/make-find-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError, z } from 'zod'

export async function findPets(req: FastifyRequest, reply: FastifyReply) {
  try {
    const querySchema = z.object({
      ageRange: z.enum(['CUB', 'YOUNG', 'ADULT']).optional(),
      energy: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
      independenceLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
      size: z.enum(['SMALL', 'MEDIUM', 'LARGE', 'GIANT']).optional(),
    })

    const paramsSchema = z.object({
      city: z.string(),
    })

    const { city } = paramsSchema.parse(req.params)

    const { ageRange, energy, independenceLevel, size } = querySchema.parse(
      req.query,
    )

    const getPetsByCityUseCase = makeFindPetsUseCase()

    const { pets } = await getPetsByCityUseCase.execute({
      city,
      ageRange,
      energy,
      independenceLevel,
      size,
    })

    return reply.send({ pets })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    } else if (err instanceof ZodError) {
      return reply.status(400).send({ message: err.flatten().fieldErrors })
    }
  }
}
