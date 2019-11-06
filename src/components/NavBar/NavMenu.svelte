<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let position = "start";
  export let ariaLabel = "";
</script>

<nav
  {id}
  class={['nav-menu', position, className].concat(classNames).filter(Boolean).join(' ')}
  aria-label={ariaLabel}>
  <ul class="nav-menu-bar" role="menubar">
    <slot />
  </ul>
</nav>
