<script>
  import { getContext } from "svelte";

  import TableCell from "../../layout/Table/TableCell.svelte";

  export let id = null;
  let className = null;
  export { className as class };

  export let field = "";
  export let header = "";
  export let sortable = false;
  export let sortDirection = "";

  // Register this item with the parent DataTable
  const { registerColumn } = getContext("datatable");
  registerColumn(field, header, sortable, sortDirection);
</script>

<TableCell {id} class={[className].filter(Boolean).join(" ")}>
  <slot />
</TableCell>
