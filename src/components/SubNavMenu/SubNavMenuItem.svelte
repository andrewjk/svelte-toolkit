<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
</script>

<style>
  li {
    display: inline;
  }
</style>

<li
  {id}
  class={['sub-nav-menu-item', className].concat(classNames).filter(Boolean).join(' ')}
  role="menuitem">
  <slot />
</li>
