import { hash } from "./helpers";
import { Block, Payload } from "./types";

export class Blockchain {
  #chain: Block[] = []
  #prefixPow = '0'

  constructor(private readonly difficulty = 4) {
    this.#chain.push(this.#createFirstBlock())
  }

  #createFirstBlock(): Block {
    const payload: Payload = {
      sequency: 0,
      timestamp: +new Date(),
      data: 'First block',
      oldHash: ''
    }

    return {
      header: {
        nonce: 0,
        hash: hash(JSON.stringify(payload))
      },
      payload
    }
  }

  private get lastBlock(): Block {
    return this.#chain.at(-1) as Block
  }

  private hashLastBlock(): string {
    return this.lastBlock.header.hash
  }
}