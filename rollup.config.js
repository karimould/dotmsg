import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import del from "rollup-plugin-delete";

export default {
  input: "src/index.ts",
  external: ["fs"],
  output: [
    {
      file: "dist/dotmsg.esm.js",
      format: "es",
      sourcemap: true,
    },
    {
      file: "dist/dotmsg.cjs.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/dotmsg.umd.js",
      format: "umd",
      name: "DotMsg",
      sourcemap: true,
    },
  ],
  plugins: [
    del({ targets: "dist/*" }),
    typescript({
      typescript: require("typescript"),
    }),
    commonjs(),
    resolve(),
    terser(),
  ],
};
