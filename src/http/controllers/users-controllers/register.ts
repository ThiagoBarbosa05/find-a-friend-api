import { getGeolocation } from '@/lib/get-location'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError, z } from 'zod'

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
      street: z
        .string()
        .min(1, { message: 'Please enter a street address' })
        .optional(),
      city: z.string().min(1, { message: 'Please enter a city' }).optional(),
      state: z.string().min(1, { message: 'Please enter a state' }).optional(),
      postal_code: z.string().refine((value) => /^[0-9]{8}$/.test(value), {
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

    const locationResponse = await getGeolocation(postal_code)

    const address = {
      state: locationResponse.state ?? state,
      city: locationResponse.city ?? city,
      postal_code,
      street: locationResponse.street ?? street,
    }

    const registerUseCase = makeRegisterUseCase()

    const { userCreated } = await registerUseCase.execute({ user, address })

    const token = await reply.jwtSign(
      { role: userCreated.role },
      { sign: { sub: userCreated.id } },
    )

    const refreshToken = await reply.jwtSign(
      { role: userCreated.role },
      { sign: { sub: userCreated.id, expiresIn: '7d' } },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(201)
      .send({ token })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(400).send({ message: err.message })
    } else if (err instanceof ZodError) {
      return reply.status(400).send({ message: err.flatten().fieldErrors })
    }
  }
}
