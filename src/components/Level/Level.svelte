<script>
  export let id = null;
  let className = null;
  export { className as class };
</script>

<style src="Level.scss">

</style>

<div
  {id}
  class={['level', className].filter(Boolean).join(' ')}>
  <slot />
</div>
