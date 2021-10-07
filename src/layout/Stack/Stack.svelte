<script>
  import { setContext } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };

  export let direction = "vertical";
  export let spaced = null;
  export let nowrap = null;

  setContext("stack", {
    direction,
    spaced,
  });
</script>

<div
  {id}
  class={["stack", direction, nowrap ? "nowrap" : null, className]
    .filter(Boolean)
    .join(" ")}
>
  <slot />
</div>

<style>
  /* These styles were automatically generated from Stack.scss */
  .stack {
    display: flex;
    margin: 0 0 var(--element-margin, 1.5rem);
  }

  .stack:last-child {
    margin-bottom: 0;
  }

  .stack.vertical {
    flex-direction: column;
    height: 100%;
  }

  .stack.horizontal {
    flex-direction: row;
  }

  .stack.nowrap {
    flex-wrap: nowrap;
  }
</style>
