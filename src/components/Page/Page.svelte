<script>
  export let id = null;
  let className = null;
  export { className as class };
</script>

<style src="Page.scss">

</style>

<div
  {id}
  class={['page', className].filter(Boolean).join(' ')}>
  <slot />
</div>
