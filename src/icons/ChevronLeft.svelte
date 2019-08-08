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
    <path d="M70,10 L30,50 L70,90" fill="none" />
  </g>
</svg>
