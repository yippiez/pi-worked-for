# pi-worked-for

Track how long each Pi agent run worked and expose it to compatible editors.

## Install

```bash
pi install git:github.com/yippiez/pi-worked-for
```

For a project-local installation:

```bash
pi install -l git:github.com/yippiez/pi-worked-for
```

## Development

```bash
npm install
npm run typecheck
pi --no-extensions -e ./extensions/pi-worked-for/index.ts
```

Extracted from the current implementation in [pchain](https://github.com/yippiez/pchain).
