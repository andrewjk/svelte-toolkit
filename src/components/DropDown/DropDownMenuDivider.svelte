<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
</script>

<div
  {id}
  class={['drop-down-menu-divider', className].concat(classNames).filter(Boolean).join(' ')}>
</div>
