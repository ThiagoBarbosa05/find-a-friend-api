import { GeoLocation } from '@/@types'
import { env } from '@/env'
import axios from 'axios'

export async function getGeolocation(cep: string): Promise<GeoLocation> {
  const response = await axios.get(`${env.BASE_URL_LOCATION_API}/${cep}`)

  return response.data
}
