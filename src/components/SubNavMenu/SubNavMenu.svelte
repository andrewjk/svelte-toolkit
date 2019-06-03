<script>
  export let id = null;
  export let className = null;
  export let type = "";
  export let ariaLabel = "";
</script>

<style>
  .sub-nav-menu ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
</style>

<nav
  {id}
  class={['sub-nav-menu', type, className].filter(Boolean).join(' ')}
  aria-label={ariaLabel}>
  <ul role="menubar">
    <slot />
  </ul>
</nav>
