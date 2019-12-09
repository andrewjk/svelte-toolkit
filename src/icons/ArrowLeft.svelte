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
  stroke-linejoin="round"
  stroke-width="12">
  <g>
    <polygon points="60,25 30,50 60,75" />
  </g>
</svg>
