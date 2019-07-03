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
    <polygon points="25,60 50,30 75,60" stroke-linejoin="round" />
  </g>
</svg>
