<script>
  import { onMount, beforeUpdate, setContext } from "svelte";

  export let value = 0;

  // TODO: Need to be able to fill this with headers from slots
  // A collection containing the active state for each item
  $: tabItems = [];

  // HACK: This seems like bad code, but I don't know how to handle events from items that are
  // declared in slots
  setContext("tabs", {
    // The registerItem function is called from each TabItem to register itself with this
    // Tabs. They pass us their header, as well as a setActive method that we can call
    registerItem: (id, header, setActive) => {
      tabItems = [...tabItems, { active: false, id, header, setActive }];
    }
  });

  beforeUpdate(() => {
    // Update active items, in case the value property has been changed externally
    toggleItem(value);
  });

  function handleClick(e) {
    // HACK: Is there a better way to get the index?
    const index = parseInt(e.target.dataset.index);
    toggleItem(index);
  }

  function toggleItem(index) {
    let sanitizedValue = index;

    // Make sure the value isn't outside the bounds of the items
    if (sanitizedValue < 0) {
      sanitizedValue = 0;
    } else if (sanitizedValue > tabItems.length - 1) {
      sanitizedValue = tabItems.length - 1;
    }

    // Toggle items
    tabItems.map((item, itemIndex) => {
      // The item is active if it has the supplied index (i.e. if it was clicked)
      item.active = itemIndex === sanitizedValue;
      item.setActive(item.active);
    });

    // TODO: Force reactivity so that the tab buttons get aria-selected set
    tabItems = tabItems

    // HACK: Children are mounted in reverse order?
    // Set the value to the index of the active item
    value = index;
  }
</script>

<style>
  .tab-list {
    border-bottom: 1px solid #ddd;
    cursor: pointer;
  }

  .tab-list button.active {
    font-weight: bold;
  }
</style>

<div class="tabs">
  <div class="tab-list" role="tablist" aria-label="TODO: maybe a property?">
    {#each tabItems.reverse() as item, index}
      <button
        id={item.id ? item.id + '-tab' : null}
        class={'button' + (item.active ? ' active' : '')}
        role="tab"
        aria-selected={item.active}
        tabindex="-1"
        aria-controls={item.id}
        data-index={index}
        on:click={handleClick}>
        {item.header}
      </button>
    {/each}
  </div>
  <slot />
</div>
