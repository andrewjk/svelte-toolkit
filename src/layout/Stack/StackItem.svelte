<script>
  import { getContext } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };

  export let width = "grow";

  let spaced = false;
  let direction = "vertical";

  const context = getContext("stack");
  if (context) {
    direction = context.direction;
    spaced = context.spaced;
  }
</script>

<style src="StackItem.scss">

</style>

<div
  {id}
  class={[
    'stack-item',
    width,
    spaced ? direction.substr(0, 1) + '-spaced' : null,
    className
  ]
    .filter(Boolean)
    .join(' ')}>
  <slot />
</div>
