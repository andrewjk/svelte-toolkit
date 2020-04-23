<script>
  import { setContext } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let spaced = null;

  setContext("level", {
    spaced
  });
</script>

<style src="Level.scss">

</style>

<div {id} class={['level', className].filter(Boolean).join(' ')}>
  <slot />
</div>
