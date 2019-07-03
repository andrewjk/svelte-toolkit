<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
</script>

<svg
  {id}
  class={['icon', className].concat(classNames).filter(Boolean).join(' ')}
  viewBox="0 0 100 100">
  <g>
    <polygon points="60,25 30,50 60,75" stroke-linejoin="round" />
  </g>
</svg>
