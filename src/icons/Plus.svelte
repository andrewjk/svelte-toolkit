<script>
  export let id = null;
  let className = null;
  export { className as class };
</script>

<style src="Icon.scss">

</style>

<svg
  {id}
  class={['icon', className].filter(Boolean).join(' ')}
  viewBox="0 0 100 100"
  stroke-width="12">
  <g>
    <path d="M50,10 L50,90" />
    <path d="M10,50 L90,50" />
  </g>
</svg>
