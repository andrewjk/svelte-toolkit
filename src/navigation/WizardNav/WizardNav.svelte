<script>
  import { createEventDispatcher } from "svelte";

  import ChevronLeft from "../../icons/ChevronLeft/ChevronLeft.svelte";
  import ChevronRight from "../../icons/ChevronRight/ChevronRight.svelte";

  export let id = null;
  let className = null;
  export { className as class };
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

{#if itemCount > 0}
  <div
    {id}
    class={["wizard-nav", className].filter(Boolean).join(" ")}
    tabindex="0"
  >
    {#if index > 0}
      <button
        class="button wizard-button previous"
        type="button"
        aria-label="Previous"
        tabindex="-1"
        on:click={(e) => setIndex(index - 1)}
      >
        <slot name="prev-button">
          <ChevronLeft class="wizard-button-icon" />
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
        on:click={(e) => setIndex(index + 1)}
      >
        <span> Next </span>
        <slot name="next-button">
          <ChevronRight class="wizard-button-icon" />
        </slot>
      </button>
    {/if}

    {#if index === itemCount - 1}
      <button
        class="button wizard-button finish"
        type="button"
        aria-label="Finish"
        tabindex="-1"
        on:click={(e) => dispatch("finished")}
      >
        <span>Finish</span>
      </button>
    {/if}
  </div>
{/if}

<style>
  /* These styles were automatically generated from WizardNav.scss */
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

  .wizard-nav {
    padding: calc(var(--element-padding, 2rem) / 2) 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .wizard-button {
    margin-left: calc(var(--element-margin, 1.5rem) / 2);
    padding: calc(var(--element-padding, 2rem) / 4) calc(var(--element-padding, 2rem) / 2);
  }

  .wizard-button.finish {
    background-color: var(--select-color, #3396ff);
    border-color: var(--select-color, #3396ff);
    color: var(--select-text-color, #fff);
    font-weight: bold;
  }

  :global(.wizard-button-icon + *) {
    margin-left: calc(var(--element-margin, 1.5rem) / 2);
  }

  :global(* + .wizard-button-icon) {
    margin-left: calc(var(--element-margin, 1.5rem) / 2);
  }
</style>
