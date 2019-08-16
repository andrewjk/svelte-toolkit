<script>
  import { setContext, onMount, createEventDispatcher } from "svelte";

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

  let view = buildView();

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
          pageNumber = 1;
          columns[i].sortDirection = "desc";
          columns[i].setSortDirection("desc");
          dispatch("sort", { sort: field, sortDirection: "desc" });
        } else {
          pageNumber = 1;
          columns[i].sortDirection = "asc";
          columns[i].setSortDirection("asc");
          dispatch("sort", { sort: field, sortDirection: "asc" });
        }
      } else {
        columns[i].sortDirection = "";
        columns[i].setSortDirection("");
      }
    }
    view = buildView();
  }

  function handlePage(e) {
    pageNumber = e.detail;
    view = buildView();
    dispatch("page", pageNumber);
  }

  function buildView() {
    if (items) {
      itemCount = items.length;

      let newView = items.slice(0, items.length);

      // Sort the items
      for (let i = 0; i < columns.length; i++) {
        if (columns[i].sortDirection) {
          newView.sort(
            compare(columns[i].field, columns[i].sortDirection === "desc")
          );
        }
      }

      // Page the items
      const start = (pageNumber - 1) * pageSize;
      const end = start + pageSize;
      newView = newView.slice(start, end);

      return newView;
    } else if (data) {
      // The user should have passed us the sorted, paged data
      return data;
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
{:else}
  <slot name="empty" />
{/if}
<Pagination {pageNumber} {pageSize} {itemCount} on:change={handlePage} />
