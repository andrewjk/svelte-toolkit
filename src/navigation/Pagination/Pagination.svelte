<script>
  import { createEventDispatcher } from "svelte";
  import { keyCodes } from "../../utils/key-codes";

  import ChevronLeft from "../../icons/ChevronLeft/ChevronLeft.svelte";
  import ChevronRight from "../../icons/ChevronRight/ChevronRight.svelte";

  export let id = null;
  let className = null;
  export { className as class };
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
      allNumbers.push(
        pageCount - 4,
        pageCount - 3,
        pageCount - 2,
        pageCount - 1
      );
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
          numbers.push(numbers.indexOf("…") === -1 ? "…" : "$…");
        }
        if (numbers.indexOf(page) === -1) {
          numbers.push(page);
        }
      }
    }

    return numbers;
  }

  function setPageNumber(number) {
    if (number === "…" || number === "$…") {
      number = parseInt(prompt("Go to page:"));
    }
    if (number) {
      pageNumber = number;
      dispatch("change", number);
    }
  }

  function handleKey(e) {
    switch (e.keyCode) {
      case keyCodes.left: {
        const el = e.target.previousElementSibling;
        if (el) {
          el.focus();
          e.preventDefault();
        }
        break;
      }
      case keyCodes.right: {
        const el = e.target.nextElementSibling;
        if (el) {
          el.focus();
          e.preventDefault();
        }
        break;
      }
      case keyCodes.home: {
        const el = e.target.parentNode.firstElementChild;
        if (el) {
          el.focus();
          e.preventDefault();
        }
        break;
      }
      case keyCodes.end: {
        const el = e.target.parentNode.lastElementChild;
        if (el) {
          el.focus();
          e.preventDefault();
        }
        break;
      }
    }
  }
</script>

{#if pageCount > 1}
  <div
    {id}
    class={["pagination", className].filter(Boolean).join(" ")}
    tabindex="0"
  >
    <button
      class="button pagination-button"
      type="button"
      disabled={pageNumber <= 1}
      on:click={(e) => setPageNumber(pageNumber - 1)}
      on:keydown={(e) => handleKey(e)}
      aria-label="Previous"
      tabindex="-1"
    >
      <slot name="prev-button">
        <ChevronLeft />
      </slot>
    </button>

    {#each pageNumbers() as number, index (number)}
      <button
        class="button pagination-button"
        type="button"
        class:active={pageNumber === number}
        on:click={(e) => setPageNumber(number)}
        on:keydown={(e) => handleKey(e)}
        tabindex="-1"
      >
        {number.toString().replace("$", "")}
      </button>
    {/each}

    <button
      class="button pagination-button"
      disabled={pageNumber >= pageCount}
      type="button"
      on:click={(e) => setPageNumber(pageNumber + 1)}
      on:keydown={(e) => handleKey(e)}
      aria-label="Next"
      tabindex="-1"
    >
      <slot name="next-button">
        <ChevronRight />
      </slot>
    </button>
  </div>
{/if}

<style>
  /* These styles were automatically generated from Pagination.scss */
  .button {
    background-color: var(--button-back-color, #fff);
    border: 1px solid var(--border-color, #d2d2d2);
    border-radius: var(--border-radius, 2px);
    color: var(--button-text-color, rgba(0, 0, 0, 0.7));
    cursor: pointer;
    position: relative;
    white-space: nowrap;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .button:focus {
    background-color: var(--button-hover-color, #cccccc);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.5) inset;
    outline: 0;
  }

  .button:hover {
    background-color: var(--button-hover-color, #cccccc);
  }

  /* Remove the black dotted focus border in Firefox */
  .button::-moz-focus-inner {
    border: 0;
  }

  .pagination {
    padding: calc(var(--element-padding, 2rem) / 2) 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pagination-button {
    margin-left: calc(var(--element-margin, 1.5rem) / 2);
    padding: calc(var(--element-padding, 2rem) / 4) calc(var(--element-padding, 2rem) / 2);
    min-width: 3rem;
  }

  .pagination-button.active {
    background-color: var(--select-color, #3396ff);
    border-color: var(--select-color, #3396ff);
    color: var(--select-text-color, #fff);
    font-weight: bold;
  }

  .pagination-button:disabled,
  .pagination-button:disabled:hover,
  .pagination-button:disabled:focus {
    background-color: var(--disabled-color, #f2f2f2);
    color: var(--disabled-text-color, #c2c2c2);
    cursor: default;
  }
</style>
