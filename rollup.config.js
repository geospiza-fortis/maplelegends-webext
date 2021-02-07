import copy from "rollup-plugin-copy-watch";
import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import css from "rollup-plugin-css-only";

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: "src/content.js",
    output: [{ file: "dist/content-bundle.js", format: "iife" }],
    plugins: [
      svelte({ compilerOptions: { dev: !production } }),
      css({ output: "content-bundle.css" }),
      resolve({ browser: true }),
      commonjs(),
      copy({
        targets: [{ src: "static/*", dest: "dist" }],
        watch: production ? null : "static",
      }),
    ],
  },
  {
    input: "src/background.js",
    output: [{ file: "dist/background-bundle.js", format: "iife" }],
  },
  {
    input: "src/popup.js",
    output: {
      sourcemap: true,
      format: "iife",
      name: "app",
      file: "dist/popup/bundle.js",
    },
    plugins: [
      svelte({ compilerOptions: { dev: !production } }),
      css({ output: "bundle.css" }),
      resolve({ browser: true, dedupe: ["svelte"] }),
      commonjs(),
    ],
  },
];
