<script>
  import { setContext } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };

  export let spaced = null;
  export let nowrap = null;

  setContext("grid", {
    spaced
  });
</script>

<style src="Grid.scss">

</style>

<div
  {id}
  class={['grid', spaced ? 'spaced' : null, nowrap ? 'nowrap' : null, className].filter(Boolean).join(' ')}>
  <slot />
</div>
