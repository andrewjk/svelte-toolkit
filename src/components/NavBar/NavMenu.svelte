<script>
  export let id = null;
  export let className = null;
  export let position = "left";
</script>

<div
  {id}
  class={['nav-menu', position, className].filter(Boolean).join(' ')}
  role="menubar">
  <slot/>
</div>
