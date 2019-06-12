<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let position = "left";
</script>

<div
  {id}
  class={['nav-menu', position, className].filter(Boolean).join(' ')}
  role="menubar">
  <slot/>
</div>
