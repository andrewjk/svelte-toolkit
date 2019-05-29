<script>
  export let id = null;
  export let className = null;
  export let active = false;
</script>

<div
  {id}
  class={['drop-down-menu-item', className].filter(Boolean).join(' ')}
  class:active
  role="menuitem">
  <slot/>
</div>
