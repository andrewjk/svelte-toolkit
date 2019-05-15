<script>
  import { onMount, getContext } from "svelte";

  export let id = null;
  export let header = null;

  let expanded;

  // The index of this item in the parent Accordion"s state collection, which is passed to the parent
  // when the header is clicked:
  let index;
  // The method on the parent Accordion to call when the header is clicked:
  let toggleItem;

  onMount(() => {
    // Register this item with the parent Accordion, which will handle toggling expanded for all items
    const { registerItem } = getContext("accordion");
    const result = registerItem(setExpanded);
    index = result.index;
    toggleItem = result.toggleItem;
  });

  // This function is called by the parent Accordion to set this item"s expanded value
  function setExpanded(value) {
    expanded = value;
  }

  function handleClick(e) {
    // Pass the index to the toggleItem method in the parent Accordion which will handle toggling
    // the value of expanded for all items (e.g. to close other items if necessary)
    toggleItem(index);
  }
</script>

<style>
  .accordion-item {
    border-bottom: 1px solid #ddd;
  }

  .accordion-header button {
    cursor: pointer;
    text-align: left;
    width: 100%;
  }

  .accordion-panel {
    display: none;
  }

  .accordion-panel.expanded {
    display: block;
  }
</style>

<div class="accordion-item">
  <div
    id={id ? id + '-header' : ''}
    class={'accordion-header' + (expanded ? ' expanded' : '')}
    aria-expanded={expanded}
    aria-controls={id}>
    <button class="button" on:click={handleClick}>
      <slot name="header">{header}</slot>
    </button>
  </div>
  <div
    {id}
    class={'accordion-panel' + (expanded ? ' expanded' : '')}
    role="region"
    aria-labelledby={id ? id + '-header' : ''}>
    <slot />
  </div>
</div>
