/*
 * In our context, '__substg1.0_0037001F' represents the subject of the email in a .msg file.
 *  - '__substg1.0_': This prefix is commonly used in .msg files to represent the hierarchical structure of the file.
 *    It's typically part of the entry names that contain a specific message property.
 *  - '0037': This is the property tag for the email subject. It's a 4-digit hexadecimal code that identifies the specific property.
 *  - '001F': This is the property type, which indicates that the content of the property is encoded in UTF-16LE (Little Endian).
 * In summary, the entry '__substg1.0_0037001F' indicates an email subject encoded in UTF-16LE.
 * In the MSG_PROPERTY_TAGS constant, the subject is assigned the tag '0x0037001F', which includes the combined property tag and property type.
 */
export const MSG_PROPERTY_TAGS = {
  SENDER_NAME: {
    tag: "__substg1.0_0C1A001F",
    description: "Sender Name",
  },
  SENDER_EMAIL: {
    tag: "__substg1.0_0C1F001F",
    description: "Sender Email",
  },
  SENT_DATE: {
    tag: "__substg1.0_0E060040",
    description: "Sent Date",
  },
  RECEIVED_BY_NAME: {
    tag: "__substg1.0_0C15001F",
    description: "Received By Name",
  },
  RECEIVED_BY_EMAIL: {
    tag: "__substg1.0_0C1E001F",
    description: "Received By Email",
  },
  RECEIVED_DATE: {
    tag: "__substg1.0_0E070040",
    description: "Received Date",
  },
  MESSAGE_CC: {
    tag: "__substg1.0_0E03001F",
    description: "Message CC",
  },
  MESSAGE_BCC: {
    tag: "__substg1.0_0E02001F",
    description: "Message BCC",
  },
  SUBJECT: {
    tag: "__substg1.0_0037001F",
    description: "Subject",
  },
  PLAIN_TEXT_CONTENT: {
    tag: "__substg1.0_1000001F",
    description: "Plain Text Content",
  },
  HTML_CONTENT: {
    tag: "__substg1.0_10130102",
    description: "HTML Content",
  },
  PRIORITY: {
    tag: "__substg1.0_00260003",
    description: "Priority",
  },
  TO: {
    tag: "__substg1.0_0E04001F",
    description: "To",
  },
  ATTACHMENT_ENTRY: {
    tag: "__attach_version1.0_",
    description: "Attachment Entry",
  },
  ATTACHMENT_FILENAME: {
    tag: "__substg1.0_3704001F",
    description: "Attachment Filename",
  },
  ATTACHMENT_DATA: {
    tag: "__substg1.0_37010102",
    description: "Attachment Data",
  },
  REPLY_TO: {
    tag: "__substg1.0_1013011F",
    description: "Reply-To Address",
  },
  IMPORTANCE: {
    tag: "__substg1.0_00170003",
    description: "Importance",
  },
  DELIVERY_RECEIPT_REQUESTED: {
    tag: "__substg1.0_0C150003",
    description: "Delivery Receipt Requested",
  },
};
