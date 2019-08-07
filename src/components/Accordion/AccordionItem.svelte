<script>
  import { getContext, createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
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

<style>
  .accordion-header-button {
    text-align: left;
    width: 100%;
  }
</style>

<div
  class={['accordion-item', className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}>
  <div
    id={id ? id + '-header' : ''}
    class="accordion-header"
    class:expanded
    aria-expanded={expanded}
    aria-controls={id}>
    <button
      bind:this={headerButton}
      class="button accordion-header-button"
      type="button"
      tabindex="-1"
      on:click={handleClick}
      on:keydown={handleKey}>
      <slot name="header">{header}</slot>
    </button>
  </div>
  {#if expanded}
    <div
      {id}
      class="accordion-panel"
      class:expanded
      role="region"
      aria-labelledby={id ? id + '-header' : ''}
      transition:slide>
      <slot />
    </div>
  {/if}
</div>
