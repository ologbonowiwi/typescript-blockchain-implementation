import { hash, isHashProofed } from "./helpers";
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
      sequence: 0,
      timestamp: +new Date(),
      data: 'Block 0',
      previousHash: ''
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
      sequence: this.#lastBlock.payload.sequence + 1,
      data,
      previousHash: this.#hashLastBlock(),
      timestamp: +new Date()
    }
  }

  mineBlock(block: Payload): Block {
    let nonce = 0
    const startTime = +new Date()

    while(true) {
      const hashBlock = hash(JSON.stringify(block))
      const hashProofOfWork = hash(hashBlock + nonce)

      if (isHashProofed({ hash: hashProofOfWork, difficulty: this.#difficulty, prefix: this.#prefixProofOfWork })) {
        const endTime = +new Date()
        const shortHash = hashBlock.slice(0, 12)
        const timeMine = (endTime - startTime) / 1000

        console.log(`Block ${block.sequence} mined in ${timeMine} seconds. Hash ${shortHash} (${nonce} tries)`)

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

  #verifyBlock(block: Block): boolean {
    if (block.payload.previousHash !== this.#hashLastBlock()) {
      console.error(`Block ${block.payload.sequence} invalid. The previous hash is ${this.#hashLastBlock().slice(0, 12)} and not ${block.payload.previousHash.slice(0, 12)}`)

      return false
    }

    const hashToValidate = hash(hash(JSON.stringify(block.payload)) + block.header.nonce)

    if (!isHashProofed({ hash: hashToValidate, difficulty: this.#difficulty, prefix: this.#prefixProofOfWork })) {
      console.error(`Block ${block.payload.sequence} invalid. Hash is not proofed, nonce ${block.header.nonce} is invalid`)

      return false
    }

    return true
  }

  appendBlock(block: Block): Block[] {
    if (this.#verifyBlock(block)) {
      this.#chain.push(block)

      console.log(`Block ${block.payload.sequence} was added to blockchain: ${JSON.stringify(block, null, 2)}`)
    }

    return this.#chain
  }

  static generate({ difficulty, blocksQuantity }: { difficulty: number, blocksQuantity: number }) {
    const blockchain = new Blockchain(difficulty)
    let chain: Block[] = []

    for (let index = 1; index < blocksQuantity; index++) {
      const block = blockchain.createBlock(`Block ${index}`)

      const minedBlock = blockchain.mineBlock(block)

      chain = blockchain.appendBlock(minedBlock)
    }

    return chain
  }
}
