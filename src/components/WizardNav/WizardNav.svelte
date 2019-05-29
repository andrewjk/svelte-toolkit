<script>
  import { createEventDispatcher } from "svelte";

  import LeftChevron from "../Icons/ChevronLeft";
  import RightChevron from "../Icons/ChevronRight";

  export let id = null;
  export let className = null;
  export let index = 1;
  export let itemCount = 0;

  const dispatch = createEventDispatcher();

  function setIndex(value) {
    if (index !== value) {
      index = value;
      dispatch("change", index);
    }
  }
</script>

<style>
  .wizard-button.active {
    font-weight: bold;
  }
</style>

{#if itemCount > 0}
  <div
    {id}
    class={['wizard-nav', className].filter(Boolean).join(' ')}
    tabindex="0">
    {#if index > 0}
      <button
        class="button wizard-button"
        on:click={e => setIndex(index - 1)}
        aria-label="Previous"
        tabindex="-1">
        <LeftChevron />
        Previous
      </button>
    {/if}

    {#if index < itemCount - 1}
      <button
        class="button wizard-button"
        on:click={e => setIndex(index + 1)}
        aria-label="Next"
        tabindex="-1">
        Next
        <RightChevron />
      </button>
    {/if}

    {#if index === itemCount - 1}
      <button
        class="button wizard-button finish"
        on:click={e => dispatch('finished')}
        aria-label="Finish"
        tabindex="-1">
        Finish
      </button>
    {/if}
  </div>
{/if}
