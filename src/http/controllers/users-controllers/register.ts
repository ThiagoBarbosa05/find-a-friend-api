import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest, reply: FastifyReply) {
  try {
    const registerBodySchema = z.object({
      name: z.string().min(2, { message: 'Please enter a valid name' }),
      email: z.string().email(),
      password: z
        .string()
        .min(6, { message: 'The password must be at least 6 characters long' }),
      whatsapp_number: z
        .string()
        .refine(
          (value) =>
            /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/.test(
              value,
            ),
          {
            message: 'whatsapp number is invalid.',
          },
        ),
      street: z.string().min(1, { message: 'Please enter a street address' }),
      city: z.string().min(1, { message: 'Please enter a city' }),
      state: z.string().min(1, { message: 'Please enter a state' }),
      postal_code: z.string().refine((value) => /^\d{8}$/.test(value), {
        message: 'Invalid postal code. It must have 8 digits.',
      }),
    })

    const {
      city,
      email,
      name,
      password,
      postal_code,
      state,
      street,
      whatsapp_number,
    } = registerBodySchema.parse(req.body)

    const user = {
      email,
      name,
      password,
      whatsapp_number,
    }

    const address = {
      state,
      city,
      postal_code,
      street,
    }

    const registerUseCase = makeRegisterUseCase()

    const { userCreated } = await registerUseCase.execute({ user, address })

    const token = await reply.jwtSign(
      { role: userCreated.role },
      { sign: { sub: userCreated.id } },
    )

    reply.send({ token })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      reply.status(400).send({ message: err.message })
    }
  }
}
