<script>
  import { setContext, createEventDispatcher } from "svelte";

  import TableHeader from "./TableHeader.svelte";
  import Pagination from "../Pagination/Pagination.svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];

  export let data = [];
  export let keyField = "";
  export let columns = [];

  let view = null;

  const dispatch = createEventDispatcher();

  setContext("table", {
    registerColumn: (field, header, sortable, sortDirection) => {
      if (!columns.some(c => c.field === field)) {
        columns = [...columns, { field, header, sortable, sortDirection }];
      }
    },
    registerHeader: (field, sortDirection, setSortDirection) => {
      if (!columns.some(c => c.field === field)) {
        columns = [...columns, { field }];
      }
      for (let i = 0; i < columns.length; i++) {
        if (columns[i].field === field) {
          columns[i].sortDirection = sortDirection;
          columns[i].setSortDirection = setSortDirection;
        }
      }
    },
    handleSort
  });

  function handleSort(field) {
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].field === field) {
        if (columns[i].sortDirection === "asc") {
          columns[i].sortDirection = "desc";
          columns[i].setSortDirection("desc");
          dispatch("sort", { sort: field, sortDirection: "desc" });
        } else {
          columns[i].sortDirection = "asc";
          columns[i].setSortDirection("asc");
          dispatch("sort", { sort: field, sortDirection: "asc" });
        }
      } else {
        columns[i].sortDirection = "";
        columns[i].setSortDirection("");
      }
    }
  }
</script>

{#if data && data.length}
  <table
    {id}
    class={['table', className]
      .concat(classNames)
      .filter(Boolean)
      .join(' ')}>
    <thead>
      <slot name="header">
        <tr>
          {#each columns as item}
            <TableHeader
              field={item.field}
              sortable={item.sortable}
              sortDirection={item.sortDirection}>
              {item.header}
            </TableHeader>
          {/each}
        </tr>
      </slot>
    </thead>
    <tbody>
      {#each data as item (item[keyField])}
        <tr>
          <slot {item} />
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <slot name="empty" />
{/if}
