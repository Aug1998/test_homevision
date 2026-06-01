export type House = {
  id: number
  address: string
  homeowner: string
  price: number
  photoURL: string
}

export type ApiResponse = {
  houses: House[]
}