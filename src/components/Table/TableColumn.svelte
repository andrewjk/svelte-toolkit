<script>
  import { getContext } from "svelte";

  export let id = "";
  let className = null;
  export { className as class };
  export let classNames = [];

  export let field = "";
  export let header = "";
  export let sortable = false;
  export let sortDirection = "";

  // Register this item with the parent Table
  const { registerColumn } = getContext("table");
  registerColumn(field, header, sortable, sortDirection);
</script>

<td
  {id}
  class={[className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}>
  <slot/>
</td>
