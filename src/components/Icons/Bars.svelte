<script>
  export let id = null;
  export let className = null;
</script>

<svg
  {id}
  class={['icon', className].filter(Boolean).join(' ')}
  viewBox="0 0 100 100">
  <g>
    <path d="M15,25 L85,25" />
    <path d="M15,50 L85,50" />
    <path d="M15,75 L85,75" />
  </g>
</svg>
