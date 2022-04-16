import { createHash } from 'crypto'
import { hash } from '../src/helpers'
import { chance } from './globals'

describe('helpers', () => {
  describe('hash', () => {
    it('should return the valid encrypted data', () => {
      const data = chance.string()

      expect(hash(data)).toStrictEqual(createHash('sha256').update(data).digest('hex'))
    })
  })
})