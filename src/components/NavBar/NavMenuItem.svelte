<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let active = false;
</script>

<li
  role="menuitem"
  {id}
  class={['nav-menu-item', className].filter(Boolean).join(' ')}
  class:active>
  <slot />
</li>
