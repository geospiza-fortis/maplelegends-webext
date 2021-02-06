import copy from "rollup-plugin-copy";

export default {
  input: "src/content.js",
  output: [{ file: "dist/content-bundle.js", format: "es" }],
  plugins: [copy({ targets: [{ src: "static/**/*", dest: "dist" }] })],
};
