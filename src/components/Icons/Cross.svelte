<script>
  export let id = null;
  export let className = null;
</script>

<svg
  {id}
  class={['icon', className].filter(Boolean).join(' ')}
  viewBox="0 0 100 100">
  <g>
    <path d="M10,10 L90,90" />
    <path d="M10,90 L90,10" />
  </g>
</svg>
