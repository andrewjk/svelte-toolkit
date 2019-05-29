<script>
  export let id = null;
  export let className = null;
</script>

<div
  {id}
  class={['nav-bar', className].filter(Boolean).join(' ')}
  role="navigation">
  <slot/>
</div>
