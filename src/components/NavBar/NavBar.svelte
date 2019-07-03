<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
</script>

<div
  {id}
  class={['nav-bar', className].concat(classNames).filter(Boolean).join(' ')}
  role="navigation">
  <slot/>
</div>
