# dotmsg 📧

Dotmsg is a lightweight, versatile JavaScript / TypeScript library for parsing .msg files, specifically designed for both server-side and client-side (browser) applications.
Compatible with modern web frameworks, it simplifies the process of extracting email content, metadata, and attachments from Microsoft Outlook .msg files.

## Installation 🔧

```bash
npm install dotmsg
```

## Features 🌟

- Parse .msg files from Buffer or Uint8Array inputs
- Extract email content, such as plain text and HTML content
- Extract email metadata, such as sender, recipients, subject, and dates
- Extract email attachments

## Usage 🚀

Here's a basic example of how to use the dotmsg library in an node enviroment:

```javascript
import { DotMsgParser } from "dotmsg";
import fs from "fs";

async function main() {
  const data = fs.readFileSync("path/to/your/file.msg");
  const parser = new DotMsgParser();

  await parser.parseBuffer(data);

  console.log("Subject:", parser.getSubject());
  console.log("Sender:", parser.getSenderEmail());
  console.log("Plain text content:", parser.getTextContent());
}

main();
```

## API 📘

### DotMsgParser

The main class for parsing .msg files.

Parses a .msg file from a Buffer or Uint8Array input.

```javascript
async parseBuffer(input: Buffer | Uint8Array): Promise<void>
```

Get the plain text content of the email.

```javascript
getTextContent(): string | undefined
```

Get the HTML content of the email.

```javascript
getHTMLContent(): string | undefined
```

Get the sender's email address.

```javascript
getSenderEmail(): string | undefined
```

Get the sender's name.

```javascript
getSenderName(): string | undefined
```

Get the subject of the email.

```javascript
getSubject(): string | undefined
```

Get the sent date of the email.

```javascript
getSentDate(): string | undefined
```

Get the received date of the email.

```javascript
getReceivedDate(): string | undefined
```

Get the email address of the recipient.

```javascript
getReceivedByEmail(): string | undefined
```

Get the name of the recipient.

```javascript
getReceivedByName(): string | undefined
```

Get the CC recipients of the email.

```javascript
getCC(): string[] | undefined
```

Get the priority of the email.

```javascript
getPriority(): string | undefined
```

Get the TO recipients of the email.

```javascript
getTo(): string | undefined
```

Get the BCC recipients of the email.

```javascript
getBCC(): string[] | undefined
```

Get the reply-to address of the email.

```javascript
getReplyTo(): string | undefined
```

Get the importance level of the email.

```javascript
getImportance(): string | undefined
```

Get whether a delivery receipt was requested for the email.

```javascript
getDeliveryReceiptRequested(): string | undefined
```

Get the attachments of the email.

```javascript
getAttachments(): Attachment[]
```

### Attachment

A class representing an email attachment.

Create a new Attachment instance.

```javascript
constructor(filename: string, data: Buffer)
```

The filename of the attachment.

```javascript
getFilename(): string;
```

The attachment data as a Buffer.

```javascript
getData(): Buffer;
```

## License 📄

MIT
