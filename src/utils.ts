import * as cfb from "cfb";
import { CFB$Entry } from "cfb/types";

export function findEntry(
  msgData: cfb.CFB$Container,
  tag: string
): CFB$Entry | null {
  return cfb.find(msgData, tag);
}

export function decodeUTF16LE(blob: cfb.CFB$Blob): string | undefined {
  if (!blob) return undefined;
  const buffer = new ArrayBuffer(blob.length);
  const uint8Array = new Uint8Array(buffer);
  for (let i = 0; i < blob.length; i++) {
    uint8Array[i] = blob[i];
  }

  const decoder = new TextDecoder("utf-16le");
  return decoder.decode(uint8Array);
}

export function isUTF16LE(tag: string): boolean {
  return tag.endsWith("001F");
}
