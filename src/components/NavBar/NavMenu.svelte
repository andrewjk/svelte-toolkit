<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let position = "left";
  export let ariaLabel = "";
</script>

<nav
  {id}
  class={['nav-menu', position, className].filter(Boolean).join(' ')}
  aria-label={ariaLabel}>
  <ul role="menubar">
    <slot />
  </ul>
</nav>
