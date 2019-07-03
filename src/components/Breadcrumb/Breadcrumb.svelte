<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let ariaLabel = "";
</script>

<style>
  .breadcrumb ol {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
</style>

<nav
  {id}
  class={['breadcrumb', className].concat(classNames).filter(Boolean).join(' ')}
  aria-label={ariaLabel}}>
  <ol>
    <slot />
  </ol>
</nav>
