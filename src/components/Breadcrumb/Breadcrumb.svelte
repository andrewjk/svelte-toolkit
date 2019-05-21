<script>
  export let id = null;
  export let className = null;
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
  class={['breadcrumb', className].filter(Boolean).join(' ')}
  aria-label="TODO: maybe a property?">
  <ol>
    <slot />
  </ol>
</nav>
