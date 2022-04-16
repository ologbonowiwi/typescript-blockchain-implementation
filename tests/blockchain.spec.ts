import { Blockchain } from "../src/blockchain"
import { Payload } from "../src/types"

describe('Blockchain', () => {
  let blockchain: Blockchain

  beforeAll(() => {
    const date = new Date()

    jest.spyOn<any, any>(global, 'Date').mockImplementation(() => date)
  })

  beforeEach(() => {
    blockchain = new Blockchain(4)
  })

  it('generate a valid instance', () => {
    expect(blockchain).toBeDefined()
    expect(blockchain).toBeInstanceOf(Blockchain)
  })

  it('createBlock', () => {
    const data = 'abcd'

    expect(blockchain.createBlock(data)).toStrictEqual<Payload>({
      sequency: (blockchain as any).lastBlock.payload.sequency + 1,
      data,
      oldHash: (blockchain as any).hashLastBlock(),
      timestamp: +new Date()
    })
  })
})