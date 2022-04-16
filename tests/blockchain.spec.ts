import { Blockchain } from "../src/blockchain"

describe('Blockchain', () => {
  it('generate a valid instance', () => {
    expect(new Blockchain(4)).toBeInstanceOf(Blockchain)
  })
})