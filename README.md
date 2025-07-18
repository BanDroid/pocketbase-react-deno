# PocketBase + React 19 + React Router 7 + TailwindCSS 4

## Requirements

1. Deno 2.4 (required because the react app is bundled using `deno bundle`).
2. PocketBase 0.28.4

## Installation

1. `deno install`

```bash
deno install --allow-scripts
```

2. Download [PocketBase](https://github.com/pocketbase/pocketbase/releases/tag/v0.28.4)

> Make sure the version is 0.28.4.

## Development

```bash
deno task dev
```

then open `http://localhost:8090`, if you just starting the project, you will automatically open your default browser to create first superuser for PocketBase admin.

> this will not autorefresh your browser in development (no HMR), you have to refresh your browser manually.
