<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
</script>

<style src="PageHeader.scss">

</style>

<header
  {id}
  class={['page-header', className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}>
  <slot />
</header>
