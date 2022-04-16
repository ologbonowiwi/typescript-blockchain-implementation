import { hash, isValidHash, isValidHash } from "./helpers";
import { Block, Payload } from "./types";

export class Blockchain {
  #chain: Block[] = []
  #difficulty: number
  #prefixProofOfWork = '0'

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

  mineBlock(block: Payload): Block {
    let nonce = 0
    let start = +new Date()

    while(true) {
      const hashBlock = hash(JSON.stringify(block))
      const hashProofOfWork = hash(hashBlock + nonce)

      if (isValidHash({ hash: hashProofOfWork, difficulty: this.#difficulty, prefix: this.#prefixProofOfWork })) {
        const finish = +new Date()
        const reducedHash = hashBlock.slice(0, 12)
        const timeMine = (finish - start) / 1000

        console.log(`Block ${block.sequency} mined in ${timeMine} seconds. Hash ${reducedHash} (${nonce} tries)`)

        return {
          header: {
            hash: hashBlock,
            nonce
          },
          payload: block
        }
      }

      nonce += 1
    }
  }
}