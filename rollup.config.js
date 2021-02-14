import copy from "rollup-plugin-copy-watch";
import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-css-only";
import replace from "@rollup/plugin-replace";
import child_process from "child_process";

const production = !process.env.ROLLUP_WATCH;

let replaceVersion = () =>
  replace({
    __VERSION__: process.env.npm_package_version,
    __GIT_COMMIT__: child_process
      .execSync("git rev-parse HEAD")
      .toString()
      .trim()
      .slice(0, 8),
  });

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
      production && terser(),
    ],
  },
  {
    input: "src/background.js",
    output: [{ file: "dist/background-bundle.js", format: "iife" }],
    plugins: [production && terser()],
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
      replaceVersion(),
      production && terser(),
    ],
  },
];
