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

<style src="Stack.scss">
</style>
