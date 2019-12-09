<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let active = false;
</script>

<style src="DropDownMenuItem.scss">

</style>

<div
  {id}
  class={['drop-down-item', className].filter(Boolean).join(' ')}
  class:active
  role="menuitem">
  <slot />
</div>
