<script>
  export let id = null;
  export let className = null;
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
