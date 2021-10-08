# Svelte Toolkit

A collection of UI components for [`Svelte`](https://svelte.dev/).

[View the documentation.](https://andrewjk.github.io/svelte-toolkit-docs/)

## Getting Started

The use of the [yarn](https://yarnpkg.com/) package manager is **strongly** recommended, as opposed to using `npm`.

```bash
yarn add -D svelte-toolkit
```

## Consuming from SvelteKit

Import and add the Toolkit component in \_\_layout.svelte to provide shared styles:

```javascript
import { Toolkit } from "svelte-toolkit";
...
<Toolkit />
```

Import toolkit components in your svelte component:

```javascript
import { Button } from "svelte-toolkit";
```

## Consuming from Sapper

Import and add the Toolkit component in \_layout.svelte to provide shared styles:

```javascript
import { Toolkit } from "svelte-toolkit";
...
<Toolkit />
```

Import toolkit components in your svelte component:

```javascript
import { Button } from "svelte-toolkit";
```

If you receive a warning about SSR, change it to:

```javascript
import { Button } from "svelte-toolkit/main.js";
```

(I'm not 100% sure why this happens some times and not others)

## Consuming from Electron

Import the SCSS styles in your renderer.js or renderer/index.js:

```javascript
require("svelte-toolkit/main.scss");
```

Import toolkit components in your svelte component:

```javascript
import { Button } from "svelte-toolkit";
```

## Customising

TODO:
