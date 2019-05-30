<script>
  export let id = null;
  export let className = null;
</script>

<svg
  {id}
  class={['icon', className].filter(Boolean).join(' ')}
  viewBox="0 0 100 100">
  <g>
    <path d="M10,20 L90,20" />
    <path d="M10,50 L90,50" />
    <path d="M10,80 L90,80" />
  </g>
</svg>
