<script>
  import { getContext, createEventDispatcher } from "svelte";

  import TableHeaderCell from "../../layout/Table/TableHeaderCell.svelte";
  import ArrowDown from "../../icons/ArrowDown/ArrowDown.svelte";
  import ArrowUp from "../../icons/ArrowUp/ArrowUp.svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let field = "";
  export let sortable = false;
  export let sortDirection = "";

  const dispatch = createEventDispatcher();

  // Register this item with the parent DataTable
  const { registerHeader, handleSort } = getContext("datatable");
  registerHeader(field, sortDirection, setSortDirection);

  function setSortDirection(direction) {
    sortDirection = direction;
  }

  function sort() {
    handleSort(field);
  }
</script>

<TableHeaderCell {id} class={[className].filter(Boolean).join(" ")}>
  {#if sortable}
    <button class="table-button" type="button" on:click={sort}>
      <slot />
      <slot name="indicator" {sortDirection}>
        {#if sortDirection === "asc"}
          <ArrowUp />
        {:else if sortDirection === "desc"}
          <ArrowDown />
        {/if}
      </slot>
    </button>
  {:else}
    <slot />
  {/if}
</TableHeaderCell>
