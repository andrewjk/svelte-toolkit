<script>
  export let id = null;
  export let className = null;
</script>

<div
  {id}
  class={['drop-down-menu-divider', className].filter(Boolean).join(' ')}>
</div>
