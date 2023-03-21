import * as cfb from "cfb";
import { Attachment } from "./Attachment";
import { MSG_PROPERTY_TAGS } from "./types/tags";
import { decodeUTF16LE, isUTF16LE } from "./utils";

export class DotMsgParser {
  private msgData: cfb.CFB$Container | null;

  /**
   * DotMsgParser class for parsing .msg files and extracting email content.
   */
  constructor() {
    this.msgData = null;
  }

  /**
   * Parses a .msg file from a Buffer or Uint8Array input.
   * @param input - The input data representing the .msg file as a Buffer or Uint8Array.
   * @throws {Error} If there is an error parsing the .msg file.
   * @returns A Promise that resolves when the parsing is complete.
   */
  async parseBuffer(input: Buffer | Uint8Array): Promise<void> {
    try {
      this.msgData = cfb.parse(input);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error parsing .msg file: ${error.message}`);
      } else {
        throw new Error("Error parsing .msg file.");
      }
    }
  }

  private getNonNullMsgData(): cfb.CFB$Container {
    if (!this.msgData) {
      throw new Error("No .msg file loaded.");
    }
    return this.msgData;
  }

  private getPropertyContent(tag: string): string | undefined {
    const msgData = this.getNonNullMsgData();
    const entry = cfb.find(msgData, tag);

    if (!entry) {
      return undefined;
    }

    const content = Array.isArray(entry.content)
      ? new Uint8Array(entry.content)
      : entry.content;

    return isUTF16LE(tag) ? decodeUTF16LE(content) : content.toString();
  }

  /**
   * Get the plain text content of the email.
   * @returns {string | undefined} - The plain text content, or undefined if not found.
   */
  getTextContent(): string | undefined {
    return this.getPropertyContent(MSG_PROPERTY_TAGS.PLAIN_TEXT_CONTENT.tag);
  }

  /**
   * Get the HTML content of the email.
   * @returns {string | undefined} - The HTML content, or undefined if not found.
   */
  getHTMLContent(): string | undefined {
    return this.getPropertyContent(MSG_PROPERTY_TAGS.HTML_CONTENT.tag);
  }

  /**
   * Get the sender's email address.
   * @returns {string | undefined} - The sender's email, or undefined if not found.
   */
  getSenderEmail(): string | undefined {
    return this.getPropertyContent(MSG_PROPERTY_TAGS.SENDER_EMAIL.tag);
  }

  /**
   * Get the sender's name.
   * @returns {string | undefined} - The sender's name, or undefined if not found.
   */
  getSenderName(): string | undefined {
    return this.getPropertyContent(MSG_PROPERTY_TAGS.SENDER_NAME.tag);
  }

  /**
   * Get the subject of the email.
   * @returns {string | undefined} - The email subject, or undefined if not found.
   */
  getSubject(): string | undefined {
    return this.getPropertyContent(MSG_PROPERTY_TAGS.SUBJECT.tag);
  }

  /**
   * Get the sent date of the email.
   * @returns {string | undefined} - The sent date, or undefined if not found.
   */
  getSentDate(): string | undefined {
    return this.getPropertyContent(MSG_PROPERTY_TAGS.SENT_DATE.tag);
  }

  /**
   * Get the received date of the email.
   * @returns {string | undefined} - The received date, or undefined if not found.
   */
  getReceivedDate(): string | undefined {
    return this.getPropertyContent(MSG_PROPERTY_TAGS.RECEIVED_DATE.tag);
  }

  /**
   * Get the email address of the recipient.
   * @returns {string | undefined} - The recipient's email, or undefined if not found.
   */
  getReceivedByEmail(): string | undefined {
    return this.getPropertyContent(MSG_PROPERTY_TAGS.RECEIVED_BY_EMAIL.tag);
  }

  /**
   * Get the name of the recipient.
   * @returns {string | undefined} - The recipient's name, or undefined if not found.
   */
  getReceivedByName(): string | undefined {
    return this.getPropertyContent(MSG_PROPERTY_TAGS.RECEIVED_BY_NAME.tag);
  }

  /**
   * Get the CC recipients of the email.
   * @returns {string[] | undefined} - The CC recipients, or undefined if not found.
   */
  getCC(): string[] | undefined {
    const data = this.getPropertyContent(MSG_PROPERTY_TAGS.MESSAGE_CC.tag);
    if (!data) return undefined;
    const emails = data.split(";").map((email) => email.trim());
    return emails;
  }

  /**
   * Get the priority of the email.
   * @returns {string | undefined} - The email priority, or undefined if not found.
   */
  getPriority(): string | undefined {
    return this.getPropertyContent(MSG_PROPERTY_TAGS.PRIORITY.tag);
  }

  /**
   * Get the TO recipients of the email.
   * @returns {string | undefined} - The TO recipients, or undefined if not found.
   */
  getTo(): string | undefined {
    return this.getPropertyContent(MSG_PROPERTY_TAGS.TO.tag);
  }

  /**
   * Get the BCC recipients of the email.
   * @returns {string[] | undefined} - The BCC recipients, or undefined if not found.
   */
  getBCC(): string[] | undefined {
    const data = this.getPropertyContent(MSG_PROPERTY_TAGS.MESSAGE_BCC.tag);
    if (!data) return undefined;
    const emails = data.split(";").map((email) => email.trim());
    return emails;
  }

  /**
   * Get the reply-to address of the email.
   * @returns {string | undefined} - The reply-to address, or undefined if not found.
   */
  getReplyTo(): string | undefined {
    return this.getPropertyContent(MSG_PROPERTY_TAGS.REPLY_TO.tag);
  }

  /**
   * Get the importance level of the email.
   * @returns {string | undefined} - The importance level, or undefined if not found.
   */
  getImportance(): string | undefined {
    return this.getPropertyContent(MSG_PROPERTY_TAGS.IMPORTANCE.tag);
  }

  /**
   * Get whether a delivery receipt was requested for the email.
   * @returns {string | undefined} - The delivery receipt request status, or undefined if not found.
   */
  getDeliveryReceiptRequested(): string | undefined {
    return this.getPropertyContent(
      MSG_PROPERTY_TAGS.DELIVERY_RECEIPT_REQUESTED.tag
    );
  }

  /**
   * Get the attachments of the email.
   * @returns {Attachment[]} - An array of Attachment instances representing the email attachments.
   */
  getAttachments(): Attachment[] {
    const msgData = this.getNonNullMsgData();
    const attachmentPrefix = MSG_PROPERTY_TAGS.ATTACHMENT_ENTRY.tag;
    const attachmentEntries = msgData.FullPaths.filter((path) => {
      const pathParts = path.split("/");
      return (
        pathParts.length === 3 && pathParts[1].startsWith(attachmentPrefix)
      );
    });

    const attachments: Attachment[] = [];

    attachmentEntries.forEach((entryPath) => {
      const contentTag = `${entryPath}${MSG_PROPERTY_TAGS.ATTACHMENT_DATA.tag}`;
      const contentEntry = cfb.find(msgData, contentTag);

      const filenameTag = `${entryPath}${MSG_PROPERTY_TAGS.ATTACHMENT_FILENAME.tag}`;
      const filenameEntry = cfb.find(msgData, filenameTag);
      const filename = filenameEntry
        ? isUTF16LE(filenameTag)
          ? decodeUTF16LE(filenameEntry.content)
          : filenameEntry.content.toString()
        : undefined;
      if (contentEntry && filename) {
        attachments.push(
          new Attachment(
            filename,
            Buffer.from(new Uint8Array(contentEntry.content))
          )
        );
      }
    });

    return attachments;
  }
}
