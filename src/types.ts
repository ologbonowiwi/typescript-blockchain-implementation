export interface Header {
  nonce: number
  hash: string
}

export interface Payload<K = any> {
  sequence: number
  timestamp: number
  data: K
  previousHash: string
}

export interface Block {
  header: Header
  payload: Payload
}
