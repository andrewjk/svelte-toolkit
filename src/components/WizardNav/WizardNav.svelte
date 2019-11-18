<script>
  import { createEventDispatcher } from "svelte";

  import LeftChevron from "../../icons/ChevronLeft.svelte";
  import RightChevron from "../../icons/ChevronRight.svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let index = 0;
  export let itemCount = 0;

  const dispatch = createEventDispatcher();

  function setIndex(value) {
    if (index !== value) {
      index = value;
      dispatch("change", index);
    }
  }
</script>

<style src="WizardNav.scss" global>

</style>

{#if itemCount > 0}
  <div
    {id}
    class={['wizard-nav', className]
      .concat(classNames)
      .filter(Boolean)
      .join(' ')}
    tabindex="0">
    {#if index > 0}
      <button
        class="button wizard-button previous"
        type="button"
        aria-label="Previous"
        tabindex="-1"
        on:click={e => setIndex(index - 1)}>
        <slot name="prev-button">
          <LeftChevron />
        </slot>
        <span>Previous</span>
      </button>
    {/if}

    {#if index < itemCount - 1}
      <button
        class="button wizard-button next"
        type="button"
        aria-label="Next"
        tabindex="-1"
        on:click={e => setIndex(index + 1)}>
        <span>
        Next
        </span>
        <slot name="next-button">
          <RightChevron />
        </slot>
      </button>
    {/if}

    {#if index === itemCount - 1}
      <button
        class="button wizard-button finish"
        type="button"
        aria-label="Finish"
        tabindex="-1"
        on:click={e => dispatch('finished')}>
        <span>Finish</span>
      </button>
    {/if}
  </div>
{/if}
