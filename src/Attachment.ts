export class Attachment {
  private readonly filename: string;
  private readonly content: Buffer;
  /**
   * Create an Attachment instance.
   * @param {string} filename - The name of the attachment file.
   * @param {Buffer} content - The content of the attachment as a Buffer.
   */
  constructor(filename: string, content: Buffer) {
    this.filename = filename;
    this.content = content;
  }
  /**
   * Get the filename of the attachment.
   * @returns {string} - The attachment filename.
   */
  getFilename(): string {
    return this.filename;
  }
  /**
   * Get the content of the attachment as a Buffer.
   * @returns {Buffer} - The attachment content.
   */
  getContent(): Buffer {
    return this.content;
  }
}
