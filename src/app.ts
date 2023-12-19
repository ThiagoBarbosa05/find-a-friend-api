import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const app = fastify()

app.post(
  '/organizations',
  async (request: FastifyRequest, reply: FastifyReply) => {
    // const organizationBodySchema = z.object({
    //   name: z.string(),
    //   email: z.string().email(),
    //   password: z.string(),
    //   role: z.enum(['ADMIN', 'MEMBER']),
    //   whatsapp_number: z.number(),
    // })

    // const {} = organizationBodySchema.parse(request.body)

    console.log(request.body)
    reply.send()
  },
)
