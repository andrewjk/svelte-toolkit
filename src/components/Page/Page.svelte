<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
</script>

<style src="Page.scss">

</style>

<div
  {id}
  class={['page', className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}>
  <slot />
</div>
