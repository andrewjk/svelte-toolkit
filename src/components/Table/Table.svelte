<script>
  import { setContext, createEventDispatcher } from "svelte";

  import TableHeader from "./TableHeader.svelte";
  import Pagination from "../Pagination/Pagination.svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];

  // Pass in items if you want the table to handle paging, sorting, etc, or data if you want to handle it (e.g. by fetching from a web service)
  export let items = null;
  export let data = null;
  export let keyField;
  export let columns = [];

  export let pageNumber = 1;
  export let pageSize = 10;
  export let itemCount = 0;

  export let type = "";

  $: view = buildView(items, data, columns, pageNumber, pageSize);

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
          pageNumber = 1;
          dispatch("sort", { sort: field, sortDirection: "desc" });
        } else {
          columns[i].sortDirection = "asc";
          columns[i].setSortDirection("asc");
          pageNumber = 1;
          dispatch("sort", { sort: field, sortDirection: "asc" });
        }
      } else {
        columns[i].sortDirection = "";
        columns[i].setSortDirection("");
      }
    }
  }

  function handlePage(e) {
    pageNumber = e.detail;
    dispatch("page", pageNumber);
  }

  function buildView(newItems, newData, newColumns, newPageNumber, newPageSize) {
    if (newItems) {
      itemCount = newItems.length;

      let newView = newItems.slice(0, newItems.length);

      // Sort the items
      for (let i = 0; i < newColumns.length; i++) {
        if (newColumns[i].sortDirection) {
          newView.sort(
            compare(newColumns[i].field, newColumns[i].sortDirection === "desc")
          );
        }
      }

      // Page the items
      const start = (newPageNumber - 1) * newPageSize;
      const end = start + newPageSize;
      newView = newView.slice(start, end);

      return newView;
    } else if (newData) {
      // The user should have passed us the sorted, paged data
      return newData;
    }
  }

  // From https://stackoverflow.com/a/979325
  function compare(field, reverse, primer) {
    var key = primer ? x => primer(x[field]) : x => x[field];
    reverse = !reverse ? 1 : -1;
    return function(a, b) {
      return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
    };
  }
</script>

{#if view && view.length}
  <table
    {id}
    class={['table', type, className]
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
      {#each view as item (item[keyField])}
        <tr>
          <slot {item} />
        </tr>
      {/each}
    </tbody>
  </table>
  <Pagination {pageNumber} {pageSize} {itemCount} on:change={handlePage} />
{:else}
  <slot name="empty" />
{/if}
