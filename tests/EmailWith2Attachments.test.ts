import { readFile } from "fs/promises";
import { DotMsgParser } from "../src/DotMsgParser";
function normalizeText(text?: string) {
  return text?.replace(/\s+/g, " ").trim();
}
describe("DotMsgParser", () => {
  const parser = new DotMsgParser();

  beforeAll(async () => {
    const buffer = await readFile("./data/EmailWith2Attachments.msg");
    await parser.parseBuffer(buffer);
  });

  test("getTextContent", () => {
    const expected =
      "\n\nMet vriendelijke groet,\n\nAchmea | IT | DC Generiek | DCG Build Archiefdiensten\n\nKees van Spelde\n\nSoftware engineer / Specialist ECM / Security Coördinator OpenText\n\nSpoorlaan 298 | 5017 JZ Tilburg\n\nGSM: +31 - (0)6 - 10547615\n\nE-mail : kees.van.spelde@achmea.nl <mailto:kees.van.spelde@achmea.nl> \n\nP Denk aan het milieu en print dit bericht alleen als het noodzakelijk is\n";
    const textContent = parser.getTextContent();
    expect(textContent).toBeDefined();
    const normalizedExpected = normalizeText(expected);
    const normalizedReceived = normalizeText(textContent);
    expect(normalizedReceived).toBe(normalizedExpected);
  });

  test("getSenderEmail", () => {
    const expected =
      "/O=EXCHANGELABS/OU=EXCHANGE ADMINISTRATIVE GROUP (FYDIBOHF23SPDLT)/CN=RECIPIENTS/CN=FD82E4A2A0A8484D89F5A3FCB20D87D2-KEES VAN SP";
    expect(parser.getSenderEmail()).toBe(expected);
  });

  test("getSenderName", () => {
    const expected = "Spelde van, CMMA (Kees)";
    expect(parser.getSenderName()).toBe(expected);
  });

  test("getSubject", () => {
    const expected = "E-mail with 2 attachments";
    expect(parser.getSubject()).toBe(expected);
  });

  test("getTo", () => {
    const receivedCleaned = parser.getTo()?.replace(/\0/g, "").trim();
    const expected = "Spelde van, CMMA (Kees)";
    expect(receivedCleaned).toBe(expected);
  });

  test("filename", () => {
    const attachments = parser.getAttachments();
    expect(attachments.length).toBe(2);

    const attachment1 = attachments[0];
    expect(attachment1.getFilename()).toBe("Instal~1.doc");
    expect(attachment1.getContent()).toBeInstanceOf(Buffer);

    const attachment2 = attachments[1];
    expect(attachment2.getFilename()).toBe("Instal~1.xls");
    expect(attachment2.getContent()).toBeInstanceOf(Buffer);
  });

  test("file content", () => {
    const attachments = parser.getAttachments();
    expect(attachments.length).toBe(2);

    const attachment1 = attachments[0];
    expect(attachment1.getContent()).toBeInstanceOf(Buffer);
    expect(attachment1.getContent().length).toBeGreaterThan(0);
    expect(attachment1.getContent().slice(0, 4).toString("hex")).toBe(
      "504b0304"
    );

    const attachment2 = attachments[1];
    expect(attachment2.getContent()).toBeInstanceOf(Buffer);
    expect(attachment2.getContent().length).toBeGreaterThan(0);
    expect(attachment2.getContent().slice(0, 4).toString("hex")).toBe(
      "504b0304"
    );
  });
});
