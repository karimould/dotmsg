import { readFile } from "fs/promises";
import { DotMsgParser } from "../src/DotMsgParser";

describe("DotMsgParser - EmailWithBcc", () => {
  let parser: DotMsgParser;

  beforeEach(async () => {
    parser = new DotMsgParser();
    const buffer = await readFile("./data/EmailWithBcc.msg");
    await parser.parseBuffer(buffer);
  });

  test("should get the plain text content", () => {
    const textContent = parser.getTextContent()?.replace(/\s+/g, "");
    expect(textContent).toBe(
      "Random Text\n\nLorem Ipsum 123456\n\n".replace(/\s+/g, "")
    );
  });

  test("should get undefined HTML content", () => {
    const htmlContent = parser.getHTMLContent();
    expect(htmlContent).toBeUndefined();
  });

  test("should get the sender email", () => {
    const senderEmail = parser.getSenderEmail();
    expect(senderEmail).toBe("dotmsg-js@dotmsg-js.com");
  });

  test("should get the sender name", () => {
    const senderName = parser.getSenderName();
    expect(senderName).toBe("dotmsg-js@dotmsg-js.com");
  });

  test("should get the subject", () => {
    const subject = parser.getSubject();
    expect(subject).toBe("MSG Test File With Cc");
  });

  test("should get undefined sent date", () => {
    const sentDate = parser.getSentDate();
    expect(sentDate).toBeUndefined();
  });

  // Weitere Testfälle für die anderen Eigenschaften hinzufügen
  test("should get undefined CC", () => {
    const cc = parser.getCC();
    expect(cc).toBeUndefined();
  });

  test("should get the TO recipients", () => {
    const to = parser.getTo();
    expect(to).toBe("to@mail.com");
  });

  test("should get the BCC recipients", () => {
    const bcc = parser.getBCC();
    expect(bcc).toEqual(["mail1@mail.de", "mail3@mail.de", "mail3@mail.de"]);
  });

  test("should get undefined attachments", () => {
    const attachments = parser.getAttachments();
    expect(attachments).toEqual([]);
  });
});
