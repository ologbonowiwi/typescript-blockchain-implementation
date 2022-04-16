import { Blockchain } from "../src/blockchain"
import { chance } from "./globals"

describe('Blockchain', () => {
  const blockchain: Blockchain = new Blockchain(4)
  const blocksQuantity: number = chance.integer({ min: 2, max: 10 })
  const difficulty = chance.integer({ min: 1, max: 5 })

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

    it('appendBlock', () => {
      expect(blockchain.appendBlock).toBeDefined()
      expect(blockchain.appendBlock).toBeInstanceOf(Function)
    })

    it('generate', () => {
      expect(Blockchain.generate).toBeDefined()
      expect(Blockchain.generate).toBeInstanceOf(Function)
    })
  })

  it(`should create a blockchain with ${blocksQuantity} blocks`, () => {
    const chain = Blockchain.generate({ difficulty, blocksQuantity })
    
    expect(chain.length).toBe(blocksQuantity)
  })
})