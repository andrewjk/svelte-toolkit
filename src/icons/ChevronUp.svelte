<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
</script>

<style src="Icon.scss">

</style>

<svg
  {id}
  class={['icon', className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}
  viewBox="0 0 100 100"
  stroke-width="12">
  <g>
    <path d="M10,70 L50,30 L90,70" fill="none" />
  </g>
</svg>
