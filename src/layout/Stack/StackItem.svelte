<script>
  import { getContext } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };

  export let size = "auto";

  let spaced = false;
  let direction = "vertical";

  const context = getContext("stack");
  if (context) {
    direction = context.direction;
    spaced = context.spaced;
  }
</script>

<div
  {id}
  class={[
    "stack-item",
    size,
    spaced ? direction.substr(0, 1) + "-spaced" : null,
    className,
  ]
    .filter(Boolean)
    .join(" ")}
>
  <slot />
</div>

<style>
  /* These styles were automatically generated from StackItem.scss */
  .stack-item.v-spaced {
    margin: 0 0 var(--element-margin, 1.5rem);
  }

  .stack-item.v-spaced:last-child {
    margin-bottom: 0;
  }

  .stack-item.h-spaced {
    margin: 0 var(--element-margin, 1.5rem) 0 0;
  }

  .stack-item.h-spaced:last-child {
    margin-right: 0;
  }

  .stack-item.auto {
    flex: 0 0 auto;
  }

  .stack-item.grow {
    flex: 1 1 auto;
  }
</style>
