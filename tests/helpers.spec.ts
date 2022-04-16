import { createHash } from 'crypto'
import { hash, isValidHash } from '../src/helpers'
import { chance } from './globals'

describe('helpers', () => {
  describe('hash', () => {
    it('should return the valid encrypted data', () => {
      const data = chance.string()

      expect(hash(data)).toStrictEqual(createHash('sha256').update(data).digest('hex'))
    })
  })

  describe('isValidHash', () => {
    const prefix = String(chance.integer())
    const quantityOfRepeats = chance.integer({ min: 1, max: 10 })

    it('should return true because hash has right quantity of prefix repeats', () => {
      const hash = `${prefix.repeat(quantityOfRepeats)}${chance.hash()}`

      expect(isValidHash({ hash, prefix, difficulty: quantityOfRepeats })).toBe(true)
    })

    it('should return false because hash doesn\'t have the right quantities of repeats', () => {
      const hash = `${prefix.repeat(quantityOfRepeats - 1)}${chance.hash()}`
      
      expect(isValidHash({ hash, prefix, difficulty: quantityOfRepeats })).toBe(false)
    })
  })
})