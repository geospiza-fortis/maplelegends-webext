import copy from "rollup-plugin-copy-watch";

export default [
  {
    input: "src/content.js",
    output: [{ file: "dist/content-bundle.js", format: "es" }],
    plugins: [
      copy({
        targets: [{ src: "static/*", dest: "dist" }],
        watch: "static",
      }),
    ],
  },
];
