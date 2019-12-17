<script>
  export let id = null;
  let className = null;
  export { className as class };
</script>

<style src="PageHeader.scss">

</style>

<header
  {id}
  class={['page-header', className].filter(Boolean).join(' ')}>
  <slot />
</header>
