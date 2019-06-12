<script>
  export let id = null;
  let className = null;
  export { className as class };
</script>

<div
  {id}
  class={['nav-bar', className].filter(Boolean).join(' ')}
  role="navigation">
  <slot/>
</div>
