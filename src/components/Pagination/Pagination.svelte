<script>
  import { createEventDispatcher } from "svelte";

  export let id = null;
  export let className = null;
  export let pageNumber = 1;
  export let pageSize = 10;
  export let itemCount = 0;

  $: pageCount = Math.ceil(itemCount / pageSize);

  const dispatch = createEventDispatcher();

  function pageNumbers() {
    // Get all the numbers we could possibly need
    const allNumbers = [];
    allNumbers.push(1);
    if (pageNumber <= 3) {
      allNumbers.push(2, 3, 4, 5);
    }
    if (pageNumber >= pageCount - 2) {
      allNumbers.push(pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1);
    }
    allNumbers.push(pageCount);
    allNumbers.push(pageNumber - 1);
    allNumbers.push(pageNumber);
    allNumbers.push(pageNumber + 1);
    allNumbers.sort((a, b) => a - b);

    // Add distinct numbers and ellipses to an array
    const numbers = [];
    for (let i = 0; i < allNumbers.length; i++) {
      const page = allNumbers[i];
      if (page >= 1 && page <= pageCount) {
        if (page > 1 && allNumbers.indexOf(page - 1) === -1) {
          // HACK: To get things keyed correctly, we prepend the second ellipses with $
          numbers.push(numbers.indexOf('…') === -1 ? '…' : '$…');
        }
        if (numbers.indexOf(page) === -1) {
          numbers.push(page);
        }
      }
    }

    return numbers;
  }

  function setPageNumber(number) {
    if (number === '…' || number === '$…') {
      number = prompt('Go to page:');
    }
    if (number) {
      pageNumber = number;
      dispatch('changed', number);
    }
  }
</script>

<style>
  .pagination-button.active {
    font-weight: bold;
  }
</style>

{#if pageCount > 1}
  <div
    {id}
    class={['pagination', className].filter(Boolean).join(' ')}
    tabindex="0">
    {#if pageNumber > 1}
      <button
        class="button-link pagination-button"
        on:click={e => setPageNumber(pageNumber - 1)}
        aria-label="Previous"
        tabindex="-1">
        &lt;
      </button>
    {/if}

    {#each pageNumbers() as number, index (number)}
      <button
        class="button-link pagination-button"
        class:active={pageNumber === number}
        on:click={e => setPageNumber(number)}
        tabindex="-1">
        {number.toString().replace('$', '')}
      </button>
    {/each}

    {#if pageNumber < pageCount}
      <button
        class="button-link pagination-button"
        on:click={e => setPageNumber(pageNumber + 1)}
        aria-label="Next"
        tabindex="-1">
        &gt;
      </button>
    {/if}
  </div>
{/if}
