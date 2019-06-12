<script>
  export let id = null;
  let className = null;
  export { className as class };
</script>

<svg
  {id}
  class={['icon', className].filter(Boolean).join(' ')}
  viewBox="0 0 100 100">
  <g>
    <polygon points="25,40 50,70 75,40" stroke-linejoin="round" />
  </g>
</svg>
