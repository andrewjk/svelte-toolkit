<script>
  export let id = null;
  let className = null;
  export { className as class };

  export let colspan = null;
  export let rowspan = null;
</script>

<style>
  /* These styles were automatically generated from TableCell.scss */
  td {
    padding: calc(var(--element-padding, 2rem) / 2);
  }

  td:first-child {
    padding-left: 0;
  }

  td:last-child {
    padding-right: 0;
  }
</style>

<td
  {id}
  class={className}
  {colspan}
  {rowspan}>
  <slot />
</td>
