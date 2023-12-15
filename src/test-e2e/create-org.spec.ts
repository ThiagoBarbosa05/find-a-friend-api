import { afterAll, beforeAll, describe, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Create ORG (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an organization', async () => {
    await request(app.server)
      .post('/organization')
      .send({
        name: 'org-1',
        email: 'example@email.com',
        password: '123456',
        role: 'ADMIN',
        whatsapp_number: '22-988399483',
      })
      .expect(201)
  })
})
