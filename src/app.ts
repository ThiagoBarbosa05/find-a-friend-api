import fastify, { FastifyReply, FastifyRequest } from 'fastify'

export const app = fastify()

app.post(
  '/organizations',
  async (request: FastifyRequest, reply: FastifyReply) => {},
)
