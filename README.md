# Svelt Toolkit

A collection of UI components for Svelte.

## Getting Started

The use of the [yarn](https://yarnpkg.com/) package manager is **strongly** recommended, as opposed to using `npm`.

```bash
yarn add -D svelte-toolkit
```

## Consuming from Sapper

In client.js:

```javascript
import 'svelte-toolkit/main.scss';
```

In your svelte component:

```javascript
import { Button } from "svelte-toolkit";
```

If you receive a warning about SSR, change it to:

```javascript
import { Button } from "svelte-toolkit/main.js";
```

(I'm not 100% sure why this happens some times and not others)

## Consuming from Electron

In your renderer.js or renderer/index.js:

```javascript
require('svelte-toolkit/main.scss')
```

In your svelte component:

```javascript
import { Button } from "svelte-toolkit";
```

## Customising

TODO:
