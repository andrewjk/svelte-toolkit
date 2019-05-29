<script>
  export let id = null;
  export let className = null;
</script>

<svg
  {id}
  class={['icon', className].filter(Boolean).join(' ')}
  viewBox="0 0 100 100">
  <g>
    <polygon points="60,30 30,50 60,70" />
  </g>
</svg>
