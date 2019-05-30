<script>
  export let id = null;
  export let className = null;
</script>

<svg
  {id}
  class={['icon', className].filter(Boolean).join(' ')}
  viewBox="0 0 100 100">
  <g>
    <path d="M10,55 L35,80 L90,25" fill="none" />
  </g>
</svg>
