<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
</script>

<style src="PageFooter.scss">

</style>

<footer
  {id}
  class={['page-footer', className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}>
  <slot />
</footer>
