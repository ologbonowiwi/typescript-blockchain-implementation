export interface Header {
  nonce: number
  hash: string
}

export interface Payload<K = any> {
  sequency: number
  timestamp: number
  data: K
  oldHash: string
}

export interface Block {
  header: Header
  payload: Payload
}
