<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
</script>

<style src="Icon.scss" global>

</style>

<svg
  {id}
  class={['icon', className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}
  viewBox="0 0 100 100"
  stroke-linejoin="round"
  stroke-width="12">
  <g>
    <polygon points="25,40 50,70 75,40" />
  </g>
</svg>
