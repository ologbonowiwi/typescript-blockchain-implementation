import { Blockchain } from "../src/blockchain"

describe('Blockchain', () => {
  let blockchain: Blockchain

  beforeEach(() => {
    blockchain = new Blockchain(4)
  })

  it('generate a valid instance', () => {
    expect(blockchain).toBeDefined()
    expect(blockchain).toBeInstanceOf(Blockchain)
  })
})