export function formatWhatsappNumber(phoneNumber: string) {
  return phoneNumber.replace(/\D/g, '')
}
