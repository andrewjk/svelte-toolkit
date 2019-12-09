<script>
  export let id = null;
  let className = null;
  export { className as class };
</script>

<style src="DropDownMenuDivider.scss">

</style>

<div
  {id}
  class={['drop-down-menu-divider', className].filter(Boolean).join(' ')}>
</div>
