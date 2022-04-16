import { BinaryLike, createHash } from "crypto";

export const hash = (data: BinaryLike): string => createHash('sha256').update(data).digest('hex')

export const isValidHash = ({ hash, difficulty, prefix }: { hash: string, difficulty: number, prefix: string }): boolean => {
  const check = prefix.repeat(difficulty)

  return hash.startsWith(check)
}
