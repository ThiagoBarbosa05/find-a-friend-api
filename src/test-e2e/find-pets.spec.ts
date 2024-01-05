import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { prisma } from '@/lib/prisma'

describe('Find Pets (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to retrieve pets', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'user-1@email.com',
        password_hash: 'dawfwffaf',
        name: 'user-1',
        whatsapp_number: '33435454545',
      },
    })

    await prisma.address.create({
      data: {
        city: 'Rio de Janeiro',
        postal_code: '28934459',
        state: 'Rio de Janeiro',
        street: 'rua x',
        user_id: user.id,
      },
    })

    await prisma.pet.create({
      data: {
        name: 'pet-1',
        about: 'pet very cute',
        age_range: 'CUB',
        size: 'SMALL',
        energy: 'MEDIUM',
        independence_level: 'MEDIUM',
        environment: 'BROAD',
        requirements: ['care', 'food', 'water'],
        user_id: user.id,
      },
    })

    const response = await request(app.server)
      .get(`/pets/find/Rio de Janeiro`)
      .query({ size: 'SMALL' })
      .expect(200)

    expect(response.body.pets).toEqual([
      expect.objectContaining({ size: 'SMALL' }),
    ])
  })
})
