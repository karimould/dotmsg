import { decodeUTF16LE } from "../src/utils";

describe("decodeUTF16LE", () => {
  it("should decode a UTF-16LE encoded string", () => {
    const input = new Uint8Array([104, 0, 101, 0, 108, 0, 108, 0, 111, 0]);
    const expectedOutput = "hello";
    const output = decodeUTF16LE(input);

    expect(output).toEqual(expectedOutput);
  });

  it("should return an empty string for an empty input", () => {
    const input = new Uint8Array([]);
    const expectedOutput = "";
    const output = decodeUTF16LE(input);

    expect(output).toEqual(expectedOutput);
  });
});
