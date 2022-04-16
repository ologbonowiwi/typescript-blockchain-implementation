import { BinaryLike, createHash } from "crypto";

export const hash = (data: BinaryLike): string => createHash('sha256').update(data).digest('hex')