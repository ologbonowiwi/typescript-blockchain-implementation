import Chance from "chance"
import { Blockchain } from "../src/blockchain"

const chance = new Chance()

describe('Blockchain', () => {
  let blockchain: Blockchain
  let blocksQuantity: number

  beforeAll(() => {
    blocksQuantity = chance.integer({ min: 2 })
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

    it('generateChain', () => {
      expect(blockchain.generateChain).toBeDefined()
      expect(blockchain.generateChain).toBeInstanceOf(Function)
    })
  })
})