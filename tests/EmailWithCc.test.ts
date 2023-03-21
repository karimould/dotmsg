import { readFile } from "fs/promises";
import { DotMsgParser } from "../src/DotMsgParser";

describe("DotMsgParser with custom data", () => {
  const parser = new DotMsgParser();

  beforeAll(async () => {
    const buffer = await readFile("./data/EmailWithCc.msg");
    await parser.parseBuffer(buffer);
  });

  test("getTextContent", () => {
    const expected = "Random Text Lorem Ipsum 123456".replace(/\s+/g, "");
    expect(parser.getTextContent()?.replace(/\s+/g, "")).toBe(expected);
  });

  test("getSenderEmail", () => {
    const expected = "dotmsg-js@dotmsg-js.com";
    expect(parser.getSenderEmail()).toBe(expected);
  });

  test("getSenderName", () => {
    const expected = "dotmsg-js@dotmsg-js.com";
    expect(parser.getSenderName()).toBe(expected);
  });

  test("getSubject", () => {
    const expected = "MSG Test File With Cc";
    expect(parser.getSubject()).toBe(expected);
  });

  test("getTo", () => {
    const expected = "to@mail.com";
    expect(parser.getTo()).toBe(expected);
  });

  test("getAttachments", () => {
    const attachments = parser.getAttachments();
    expect(attachments.length).toBe(0);
  });

  test("getCc", () => {
    const expected = ["mail1@mail.de", "mail3@mail.de", "mail3@mail.de"];
    expect(parser.getCC()).toEqual(expected);
  });

  test("getBcc", () => {
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

  test("getReadReceiptRequested", () => {
    expect(parser.getDeliveryReceiptRequested()).toBeUndefined();
  });

  test("getSentDate", () => {
    expect(parser.getSentDate()).toBeUndefined();
  });

  test("getReceivedDate", () => {
    expect(parser.getReceivedDate()).toBeUndefined();
  });

  test("getHtmlContent", () => {
    expect(parser.getHTMLContent()).toBeUndefined();
  });
});
