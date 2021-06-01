<script>
  import { getContext } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };

  export let position = null;

  let spaced = false;
  let collapse = false;

  const context = getContext("level");
  if (context) {
    spaced = context.spaced;
    collapse = context.collapse;
  }
</script>

<div
  {id}
  class={["level-item", position, className].filter(Boolean).join(" ")}
  class:spaced
  class:collapse
>
  <slot />
</div>

<style src="LevelItem.scss">
</style>
