<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
</script>

<svg
  {id}
  class={['icon', className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}
  viewBox="0 0 100 100"
  stroke-width="12">
  <g>
    <path d="M30,10 L70,50 L30,90" fill="none" />
  </g>
</svg>
