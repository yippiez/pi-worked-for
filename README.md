# Moved to pchain

This repository has moved into the pchain monorepo:

- https://github.com/yippiez/pchain
- Pi implementation: `pchain/pi/`

This repo is kept only for history and compatibility.

---

# pi-worked-for

Pi extension that shows a visual elapsed-time line after each prompt finishes.

Format, with a random playful verb:

```text
 Sautéed for 3 minutes\n
```

The line is a TUI widget shown above the editor until the next prompt starts. It is not added to transcript history and is not sent back to the model.

Durations are shown in seconds, minutes, hours, days, or weeks.

## Install from Git

Global install:

```bash
pi install git:github.com/yippiez/pi-worked-for
```

Local/project install:

```bash
pi install -l git:github.com/yippiez/pi-worked-for
```

## Package layout

```text
extensions/pi-worked-for.ts
package.json
README.md
```
