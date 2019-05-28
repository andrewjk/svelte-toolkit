<script>
  export let id = null;
  export let className = null;
</script>

<svg
  {id}
  class={['icon', className].filter(Boolean).join(' ')}
  viewBox="0 0 100 100">
  <g>
    <path d="M25,25 L75,75" />
    <path d="M25,75 L75,25" />
  </g>
</svg>
