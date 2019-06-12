<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let href = "";
</script>

<style>
  li {
    display: inline;
  }
</style>

<li
  {id}
  class={['sub-nav-menu-item', className].filter(Boolean).join(' ')}
  role="none">
  <a {href} role="menuitem">
    <slot />
  </a>
</li>
