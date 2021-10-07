<script>
  export let id = null;
  let className = null;
  export { className as class };
</script>

<style>
  /* These styles were automatically generated from Page.scss */
  .page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
</style>

<div
  {id}
  class={['page', className].filter(Boolean).join(' ')}>
  <slot />
</div>
