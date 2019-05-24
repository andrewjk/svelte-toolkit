<script>
  import {
    onMount,
    beforeUpdate,
    setContext,
    createEventDispatcher
  } from "svelte";

  export let id = null;
  export let className = null;
  export let index = 0;

  const dispatch = createEventDispatcher();

  // A collection containing the active state and some functions for each item
  const itemStates = [];

  // HACK: This seems like bad code, but I don't know how to handle events from items that are
  // declared in slots
  setContext("switcher", {
    // The registerItem function is called from each SwitcherItem to register itself with this
    // Switcher. They pass us their header, as well as a setActive method that we can call
    registerItem: setActive => {
      itemStates.push({ active: false, setActive });
    }
  });

  onMount(() => {
    // Set the initial active item
    toggleItem(index);
  });

  beforeUpdate(() => {
    // Update active items, in case the value property has been changed externally
    toggleItem(index);
  });

  function handleClick(e) {
    // HACK: Is there a better way to get the index?
    const clickedIndex = parseInt(e.target.dataset.index);
    toggleItem(clickedIndex);
  }

  function toggleItem(atIndex) {
    if (!itemStates.length) {
      return;
    }

    let sanitizedValue = atIndex;

    // Make sure the value isn't outside the bounds of the items
    if (sanitizedValue < 0) {
      sanitizedValue = 0;
    } else if (sanitizedValue > itemStates.length - 1) {
      sanitizedValue = itemStates.length - 1;
    }

    // Toggle items
    itemStates.map((item, itemIndex) => {
      // The item is active if it has the supplied index (i.e. if it was clicked)
      item.active = itemIndex === sanitizedValue;
      item.setActive(item.active);
    });

    // Set the value to the index of the active item
    index = atIndex;

    dispatch("changed", index);
  }
</script>

<div {id} class={['switcher', className].filter(Boolean).join(' ')}>
  <slot />
</div>
