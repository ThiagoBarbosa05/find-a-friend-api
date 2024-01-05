export enum AgeRange {
  'CUB',
  'YOUNG',
  'ADULT',
}

export enum Size {
  'SMALL',
  'MEDIUM',
  'LARGE',
  'GIANT',
}

export enum Energy {
  'LOW',
  'MEDIUM',
  'HIGH',
}

export enum IndependenceLevel {
  'LOW',
  'MEDIUM',
  'HIGH',
}

export type User = {
  id?: string
  name: string
  email: string
  password_hash: string
  role?: 'ORG' | 'USER'
  created_at?: Date
  whatsapp_number: string
  address_id?: string
}

export type Address = {
  id?: string
  street: string
  city: string
  state: string
  postal_code: string
  user_id: string
}

export type Pet = {
  id?: string
  name: string
  about?: string | null
  age_range: 'CUB' | 'YOUNG' | 'ADULT'
  size: 'SMALL' | 'MEDIUM' | 'LARGE' | 'GIANT'
  energy: 'LOW' | 'MEDIUM' | 'HIGH'
  independence_level: 'LOW' | 'MEDIUM' | 'HIGH'
  environment: 'BROAD' | 'CLOSED' | 'REDUCED'
  requirements?: string[]
  user_id: string
  created_at?: Date
}

export type GeoLocation = {
  cep: string
  state: string
  city: string
  street: string
  location: {
    coordinates?: {
      longitude?: string
      latitude?: string
    }
  }
}
