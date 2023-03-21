declare module "dotmsg" {
  export class DotMsgParser {
    constructor();
    parseBuffer(input: Uint8Array | Buffer): Promise<void>;
    getTextContent(): string | undefined;
    getHTMLContent(): string | undefined;
    getSenderEmail(): string | undefined;
    getSenderName(): string | undefined;
    getSubject(): string | undefined;
    getSentDate(): string | undefined;
    getReceivedDate(): string | undefined;
    getReceivedByEmail(): string | undefined;
    getReceivedByName(): string | undefined;
    getCC(): string[] | undefined;
    getPriority(): string | undefined;
    getTo(): string | undefined;
    getBCC(): string[] | undefined;
    getReplyTo(): string | undefined;
    getImportance(): string | undefined;
    getDeliveryReceiptRequested(): string | undefined;
    getAttachments(): Attachment[];
  }

  export class Attachment {
    constructor(filename: string, content: Buffer);
    getFilename(): string;
    getContent(): Buffer;
  }
}
