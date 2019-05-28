<script>
  export let id = null;
  export let className = null;
</script>

<svg
  {id}
  class={['icon', className].filter(Boolean).join(' ')}
  viewBox="0 0 100 100">
  <g>
    <path d="M20,40 L50,70 L80,40" />
  </g>
</svg>
