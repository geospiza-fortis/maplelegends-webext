# maplelegends-webext

Adds an icon for visibility into server status and account details. Also injects
a plot on the leveling history.

## quickstart

To build, ensure that you have node and npm installed.

```bash
npm install
```

For development on Firefox:

```bash
npm run dev
```

This generates the bundles and runs `web-ext`. For Chrome, it is sufficient to
run rollup alone and load the uncompressed addon from the `dist` folder while in
developer mode.

```bash
npm run watch-js
```

For distribution:

```
npm run build
```

The final package should be in `web-ext-artifacts`.
