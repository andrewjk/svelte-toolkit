<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
</script>

<style src="DropDownMenuDivider.scss">

</style>

<div
  {id}
  class={['drop-down-menu-divider', className].concat(classNames).filter(Boolean).join(' ')}>
</div>
