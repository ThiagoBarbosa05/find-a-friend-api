import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Authenticate (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server)
      .post('/register')
      .send({
        name: 'org-1',
        email: 'example@email.com',
        password: '123456',
        whatsapp_number: '22988399483',
        street: 'rua x',
        city: 'Berlin',
        state: 'Berlin',
        postal_code: '28951730',
      })
      .expect(201)

    const response = await request(app.server)
      .post('/login')
      .send({ email: 'example@email.com', password: '123456' })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
