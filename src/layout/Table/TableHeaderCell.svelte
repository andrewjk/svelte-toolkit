<script>
  export let id = null;
  let className = null;
  export { className as class };

  export let colspan = null;
  export let rowspan = null;
</script>

<style>
  /* These styles were automatically generated from TableHeaderCell.scss */
  th {
    padding: calc(var(--element-padding, 2rem) / 2);
    text-align: left;
  }

  th :global(a) {
    color: inherit;
  }

  th :global(.table-button) {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  th :global(.table-button:hover),
  th :global(.table-button:active) {
    text-decoration: underline;
  }

  th:first-child {
    padding-left: 0;
  }

  th:last-child {
    padding-right: 0;
  }
</style>

<th
  {id}
  class={className}
  {colspan}
  {rowspan}>
  <slot />
</th>
