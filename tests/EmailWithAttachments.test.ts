import { readFile } from "fs/promises";
import { DotMsgParser } from "../src/DotMsgParser";

describe("DotMsgParser with sample data", () => {
  const parser = new DotMsgParser();

  beforeAll(async () => {
    const buffer = await readFile("./data/EmailWithAttachments.msg");
    await parser.parseBuffer(buffer);
  });

  const EXPECTED_HTML_CONTENT = `<html>
   <head>
      <title>Peter Pann</title>
   </head>
   <body>
      <b>Hello Neverland html</b><br/>
     <img src="tinkerbell.jpg">
   </body>
</html>`;

  const EXPECTED_TEXT_CONTENT = "Hello Neverland text";

  test("getHTMLContent", () => {
    const receivedHTML = parser.getHTMLContent()?.replace(/\s+/g, "");
    const expectedHTML = EXPECTED_HTML_CONTENT.replace(/\s+/g, "");
    expect(receivedHTML).toBe(expectedHTML);
  });

  test("getTextContent", () => {
    expect(parser.getTextContent()).toBe(EXPECTED_TEXT_CONTENT);
  });

  test("getSentDate", () => {
    expect(parser.getSentDate()).toBeUndefined();
  });

  test("getReceivedDate", () => {
    expect(parser.getReceivedDate()).toBeUndefined();
  });

  test("getReceivedByName", () => {
    expect(parser.getReceivedByName()).toBeUndefined();
  });

  test("getReceivedByEmail", () => {
    expect(parser.getReceivedByEmail()).toBe("SMTP");
  });

  test("getSenderName", () => {
    expect(parser.getSenderName()).toBe("Kees");
  });

  test("getSenderEmail", () => {
    expect(parser.getSenderEmail()).toBe("peterpan@neverland.com");
  });

  test("getSubject", () => {
    expect(parser.getSubject()).toBe("This is the subject");
  });

  test("getCC", () => {
    expect(parser.getCC()).toEqual(["tinkerbel@neverland.com"]);
  });

  test("getPriority", () => {
    expect(parser.getPriority()).toBeUndefined();
  });

  test("getTo", () => {
    expect(parser.getTo()).toBe("crocodile@neverland.com");
  });

  test("getAttachments", () => {
    const attachments = parser.getAttachments();
    expect(attachments).toHaveLength(2);
    expect(attachments[0].getFilename()).toBe("PETERPAN.JPG");
    expect(attachments[1].getFilename()).toBe("TINKER~1.JPG");
  });

  test("file content", () => {
    const attachments = parser.getAttachments();
    expect(attachments.length).toBe(2);

    const attachment1 = attachments[0];
    expect(attachment1.getContent()).toBeInstanceOf(Buffer);
    expect(attachment1.getContent().length).toBeGreaterThan(0);
    expect(attachment1.getContent().slice(0, 4).toString("hex")).toBe(
      "ffd8ffe1"
    );

    const attachment2 = attachments[1];
    expect(attachment2.getContent()).toBeInstanceOf(Buffer);
    expect(attachment2.getContent().length).toBeGreaterThan(0);
    expect(attachment2.getContent().slice(0, 4).toString("hex")).toBe(
      "ffd8ffe0"
    );
  });

  test("getBCC", () => {
    expect(parser.getBCC()).toEqual(["wendy@neverland.com"]);
  });

  test("getImportance", () => {
    expect(parser.getImportance()).toBeUndefined();
  });

  test("getDeliveryReceiptRequested", () => {
    expect(parser.getDeliveryReceiptRequested()).toBeUndefined();
  });
});
