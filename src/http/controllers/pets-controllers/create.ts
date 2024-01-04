import { makeCreatePetsUseCase } from '@/use-cases/factories/make-create-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError, z } from 'zod'

export async function create(req: FastifyRequest, reply: FastifyReply) {
  try {
    const petsBodySchema = z.object({
      name: z.string(),
      about: z.string().optional(),
      ageRange: z
        .enum(['CUB', 'YOUNG', 'ADULT'])
        .refine((data) => data.toUpperCase()),
      size: z.enum(['SMALL', 'MEDIUM', 'LARGE', 'GIANT']),
      energy: z.enum(['LOW', 'MEDIUM', 'HIGH']),
      independenceLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
      environment: z.enum(['BROAD', 'CLOSED', 'REDUCED']),
      requirements: z.string().array().optional(),
    })

    const {
      ageRange,
      energy,
      environment,
      independenceLevel,
      name,
      size,
      about,
      requirements,
    } = petsBodySchema.parse(req.body)

    const createPetsUseCase = makeCreatePetsUseCase()

    await createPetsUseCase.execute({
      age_range: ageRange,
      energy,
      environment,
      independence_level: independenceLevel,
      name,
      size,
      about,
      requirements,
      user_id: req.user.sub,
    })

    reply.status(201).send()
  } catch (err) {
    if (err instanceof ZodError) {
      return reply.status(400).send({ message: err.flatten() })
    }
  }
}
