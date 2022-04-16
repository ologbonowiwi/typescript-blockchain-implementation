import { hash } from "./helpers";
import { Block, Payload } from "./types";

export class Blockchain {
  #chain: Block[] = []
  #difficulty: number
  #prefixPow = '0'

  constructor(difficulty = 4) {
    this.#difficulty = difficulty

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

  get #lastBlock(): Block {
    return this.#chain.at(-1) as Block
  }

  #hashLastBlock(): string {
    return this.#lastBlock.header.hash
  }

  createBlock(data: any): Payload {
    return {
      sequency: this.#lastBlock.payload.sequency + 1,
      data,
      oldHash: this.#hashLastBlock(),
      timestamp: +new Date()
    }
  }
}