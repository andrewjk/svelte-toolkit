<script>
  export let id = null;
  let className = null;
  export { className as class };

  export let colspan = null;
  export let rowspan = null;
</script>

<style src="TableCell.scss">

</style>

<td
  {id}
  class={className}
  {colspan}
  {rowspan}>
  <slot />
</td>
