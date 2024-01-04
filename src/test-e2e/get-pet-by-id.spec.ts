import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { prisma } from '@/lib/prisma'

describe('Get pet vy id (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should to get a pet by id', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'user-1@email.com',
        password_hash: 'dawfwffaf',
        name: 'user-1',
        whatsapp_number: '33435454545',
      },
    })

    const createdPet = await prisma.pet.create({
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
      .get(`/pets/${createdPet.id}`)
      .expect(200)

    expect(response.body.pet.id).toEqual(expect.any(String))
  })
})
