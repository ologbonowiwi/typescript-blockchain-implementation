import { hash, isValidHash } from "./helpers";
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

  #validateBlock(block: Block): boolean {
    if (block.payload.oldHash !== this.#hashLastBlock()) {
      console.error(`Block ${block.payload.sequency} invalid. The right last hash is ${this.#hashLastBlock().slice(0, 12)} and not ${block.payload.oldHash.slice(0, 12)}`)

      return false
    }

    const hashToValidate = hash(hash(JSON.stringify(block.payload) + block.header.nonce))

    if (!isValidHash({ hash: hashToValidate, difficulty: this.#difficulty, prefix: this.#prefixProofOfWork })) {
      console.error(`Block ${block.payload.sequency} invalid. Nonce ${block.header.nonce} is invalid and cannot be verified`)
      
      return false
    }

    return true
  }

  sendBlock(block: Block): Block[] {
    if (this.#validateBlock(block)) {
      this.#chain.push(block)

      console.log(`Block ${block.payload.sequency} was added to blockchain: ${JSON.stringify(block, null, 2)}`)
    }

    return this.#chain
  }
}