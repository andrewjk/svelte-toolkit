<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let size = null;
  export let padded = false;
</script>

<style src="Container.scss">

</style>

<div
  {id}
  class={['container', size, padded ? 'padded' : null, className].filter(Boolean).join(' ')}>
  <slot />
</div>
