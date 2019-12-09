<script>
  export let id = null;
  let className = null;
  export { className as class };
</script>

<style src="PageFooter.scss">

</style>

<footer
  {id}
  class={['page-footer', className].filter(Boolean).join(' ')}>
  <slot />
</footer>
