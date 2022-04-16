import { Blockchain } from "../src/blockchain"
import { Payload } from "../src/types"

describe('Blockchain', () => {
  let blockchain: Blockchain

  beforeEach(() => {
    jest.clearAllMocks()
    blockchain = new Blockchain(4)
  })

  it('generate a valid instance', () => {
    expect(blockchain).toBeDefined()
    expect(blockchain).toBeInstanceOf(Blockchain)
  })

  describe('should be defined', () => {
    it('createBlock', () => {
      expect(blockchain.createBlock).toBeDefined()
      expect(blockchain.createBlock).toBeInstanceOf(Function)
    })

    it('mineBlock', () => {
      expect(blockchain.mineBlock).toBeDefined()
      expect(blockchain.mineBlock).toBeInstanceOf(Function)
    })

    it('sendBlock', () => {
      expect(blockchain.sendBlock).toBeDefined()
      expect(blockchain.sendBlock).toBeInstanceOf(Function)
    })
  })
})