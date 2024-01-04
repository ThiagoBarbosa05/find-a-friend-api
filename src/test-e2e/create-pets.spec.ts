import { app } from '@/app'
import { afterAll, beforeAll, describe, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'pet-1',
        about: 'pet very cute',
        ageRange: 'CUB',
        size: 'SMALL',
        energy: 'MEDIUM',
        independenceLevel: 'MEDIUM',
        environment: 'BROAD',
        requirements: ['care', 'food', 'water'],
      })
      .expect(201)
  })
})
