<script>
  import { getContext, createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";

  export let id;
  let className = null;
  export { className as class };
  export let header = null;

  const dispatch = createEventDispatcher();

  let expanded = false;
  let headerButton = null;

  // Register this item with the parent Accordion, which will handle toggling expanded for all items
  const { registerItem } = getContext("accordion");
  const result = registerItem(setExpanded, setFocused);
  // The index of this item in the parent Accordion's state collection, which is passed to the parent
  // when the header is clicked:
  const index = result.index;
  // The method on the parent Accordion to call when the header is clicked:
  const toggleItem = result.toggleItem;
  const handleHeaderKey = result.handleHeaderKey;

  // This function is called by the parent Accordion to set this item's expanded value
  function setExpanded(value) {
    if (expanded !== value) {
      expanded = value;
      dispatch("expandedChange", value);
    }
  }

  // This function is called by the parent Accordion to focus this item's header button
  function setFocused() {
    headerButton.focus();
  }

  function handleClick(e) {
    // Pass the index to the toggleItem method in the parent Accordion which will handle toggling
    // the value of expanded for all items (e.g. to close other items if necessary)
    toggleItem(index);
  }

  function handleKey(e) {
    // Pass the key press up to the parent Accordion which will handle setting the focused button
    handleHeaderKey(index, e);
  }
</script>

<div class={["accordion-item", className].filter(Boolean).join(" ")}>
  <div
    id={`${id}-header`}
    class="accordion-header"
    class:expanded
    aria-expanded={expanded}
    aria-controls={id}
  >
    <button
      bind:this={headerButton}
      class="button accordion-header-button"
      type="button"
      tabindex="-1"
      on:click={handleClick}
      on:keydown={handleKey}
    >
      <slot name="header">{header}</slot>
    </button>
  </div>
  {#if expanded}
    <div
      {id}
      class="accordion-panel"
      class:expanded
      role="region"
      aria-labelledby={`${id}-header`}
      transition:slide
    >
      <slot />
    </div>
  {/if}
</div>

<style>
  /* These styles were automatically generated from AccordionItem.scss */
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

  .accordion-header-button {
    font-size: var(--font-size-title, 1.6rem);
    margin: 0 0 calc(var(--element-margin, 1.5rem) / 4);
    padding: calc(var(--element-padding, 2rem) / 4) calc(var(--element-padding, 2rem) / 2) !important;
    justify-content: flex-start;
    width: 100%;
  }

  .accordion-panel {
    padding: 0 calc(var(--element-padding, 2rem) / 2);
  }

  .accordion-item {
    margin: 0 0 calc(var(--element-margin, 1.5rem) / 4);
  }

  .accordion-item:last-child {
    margin: 0;
  }
</style>
