export type User = {
  id?: string
  name: string
  email: string
  password_hash: string
  role: 'ORG' | 'USER'
  created_at?: Date
  whatsapp_number: string
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
  about: string
  age_range: 'CUB' | 'YOUNG' | 'ADULT'
  size: 'SMALL' | 'MEDIUM' | 'LARGE' | 'GIANT'
  energy: 'LOW' | 'MEDIUM' | 'HIGH'
  independence_level: 'LOW' | 'MEDIUM' | 'HIGH'
  environment: 'BROAD' | 'CLOSED' | 'REDUCED'
  requirements: string
  user_id: string
}
