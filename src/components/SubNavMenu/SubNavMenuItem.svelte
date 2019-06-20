<script>
  export let id = null;
  let className = null;
  export { className as class };
</script>

<style>
  li {
    display: inline;
  }
</style>

<li
  {id}
  class={['sub-nav-menu-item', className].filter(Boolean).join(' ')}
  role="menuitem">
  <slot />
</li>
