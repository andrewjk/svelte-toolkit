<script>
  import { getContext } from "svelte";

  export let id = "";
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

<td
  {id}
  class={[className].filter(Boolean).join(' ')}>
  <slot/>
</td>
