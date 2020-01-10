<script>
  export let id = null;
  let className = null;
  export { className as class };

  export let colspan = null;
  export let rowspan = null;
</script>

<style src="TableHeaderCell.scss">

</style>

<th
  {id}
  class={className}
  {colspan}
  {rowspan}>
  <slot />
</th>
