<script>
  export let id = null;
  let className = null;
  export { className as class };
</script>

<style>
  /* These styles were automatically generated from PageHeader.scss */
  .page-header {
    background-color: var(--header-back-color, #fafafa);
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    color: var(--header-text-color, rgba(0, 0, 0, 0.7));
    display: table;
    line-height: var(--header-line-height, 4rem);
    padding: 0 var(--element-padding, 2rem);
    width: 100%;
  }
</style>

<header
  {id}
  class={['page-header', className].filter(Boolean).join(' ')}>
  <slot />
</header>
