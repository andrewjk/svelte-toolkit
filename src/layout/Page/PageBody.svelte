<script>
  export let id = null;
  let className = null;
  export { className as class };
</script>

<style>
  /* These styles were automatically generated from PageBody.scss */
  .page-body {
    flex: 1 0 auto;
    overflow: hidden;
    width: 100%;
  }
</style>

<main
  {id}
  class={['page-body', className].filter(Boolean).join(' ')}>
  <slot />
</main>
