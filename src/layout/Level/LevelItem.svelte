<script>
  import { getContext } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };

  export let position = null;

  let spaced = false;

  const context = getContext("level");
  if (context) {
    spaced = context.spaced;
  }
</script>

<style src="LevelItem.scss">

</style>

<div
  {id}
  class={['level-item', position, spaced ? 'spaced' : null, className]
    .filter(Boolean)
    .join(' ')}>
  <slot />
</div>
