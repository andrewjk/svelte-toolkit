<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let active = false;
</script>

<div
  {id}
  class={['drop-down-menu-item', className].filter(Boolean).join(' ')}
  class:active
  role="menuitem">
  <slot/>
</div>
