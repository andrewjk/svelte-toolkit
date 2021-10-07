<script>
  export let id = null;
  let className = null;
  export { className as class };
  
  export let type = "";
</script>

<style>
  /* These styles were automatically generated from Table.scss */
  .table {
    border-collapse: collapse;
    margin: 0 0 var(--element-margin, 1.5rem);
    width: 100%;
  }

  .table :global(p),
  .table :global(ul),
  .table :global(ol),
  .table :global(dl),
  .table :global(blockquote),
  .table :global(pre),
  .table :global(address),
  .table :global(fieldset),
  .table :global(figure) {
    margin: 0;
  }

  .table:last-child {
    margin: 0;
  }

  .table.line :global(tr) {
    border-bottom: 1px solid var(--border-color, #d2d2d2);
  }
</style>

<table
  {id}
  class={['table', type, className].filter(Boolean).join(' ')}>
  <slot />
</table>
