import { readFile } from "fs/promises";
import { DotMsgParser } from "../src/DotMsgParser";

describe("Test for DotMessageParser for TextSampleEmail", () => {
  let parser: DotMsgParser;

  beforeEach(async () => {
    parser = new DotMsgParser();
    const buffer = await readFile("./data/TxtSampleEmail.msg");
    await parser.parseBuffer(buffer);
  });

  test("getHTMLContent", () => {
    expect(parser.getHTMLContent()).toBeUndefined();
  });

  test("getTextContent", () => {
    const content = parser.getTextContent();
    expect(content).toBeDefined();
    expect(content?.startsWith("BOOK ONE: 1805")).toBeTruthy();
  });

  test("getSentDate", () => {
    expect(parser.getSentDate()).toBeUndefined();
  });

  test("getReceivedDate", () => {
    expect(parser.getReceivedDate()).toBeUndefined();
  });

  test("getSenderName", () => {
    expect(parser.getSenderName()).toBe("Wilson, Chris");
  });

  test("getSenderEmail", () => {
    expect(parser.getSenderEmail()).toBe(
      "/O=EXCHANGE/OU=EXCHANGE ADMINISTRATIVE GROUP (FYDIBOHF23SPDLT)/CN=RECIPIENTS/CN=CHRIS.WILSON"
    );
  });

  test("getSubject", () => {
    expect(parser.getSubject()).toBe("TxtSampleEmail");
  });

  test("getTo", () => {
    const receivedCleaned = parser.getTo()?.replace(/\0/g, "").trim();
    expect(receivedCleaned).toBe("Wilson, Chris");
  });

  test("getReceivedByName", () => {
    expect(parser.getReceivedByName()).toBeUndefined();
  });

  test("getReceivedByEmail", () => {
    expect(parser.getReceivedByEmail()).toBe("EX");
  });

  test("getCC", () => {
    expect(parser.getCC()).toBeUndefined();
  });

  test("getPriority", () => {
    expect(parser.getPriority()).toBeUndefined();
  });

  test("getBCC", () => {
    expect(parser.getBCC()).toBeUndefined();
  });

  test("getReplyTo", () => {
    expect(parser.getReplyTo()).toBeUndefined();
  });

  test("getImportance", () => {
    expect(parser.getImportance()).toBeUndefined();
  });

  test("getDeliveryReceiptRequested", () => {
    expect(parser.getDeliveryReceiptRequested()).toBeUndefined();
  });

  test("getAttachments", () => {
    const attachments = parser.getAttachments();
    expect(attachments).toHaveLength(0);
  });
});
