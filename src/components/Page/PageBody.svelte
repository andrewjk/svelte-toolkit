<script>
  export let id = null;
  let className = null;
  export { className as class };
</script>

<style src="PageBody.scss">

</style>

<main
  {id}
  class={['page-body', className].filter(Boolean).join(' ')}>
  <slot />
</main>
