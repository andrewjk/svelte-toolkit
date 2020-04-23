<script>
  import {
    onMount,
    beforeUpdate,
    setContext,
    createEventDispatcher
  } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let index = 0;

  const dispatch = createEventDispatcher();

  // A collection containing the active state and some functions for each item
  let itemStates = [];

  // A unique item id is set for each item
  let itemId = 0;

  setContext("switcher", {
    // The registerItem function is called from each SwitcherItem to register itself and its
    // methods with this Switcher
    registerItem: (setActive, setItemID) => {
      const newItemId = itemId++;
      itemStates = [...itemStates, { itemId: newItemId, active: false, setActive }];
      setItemID(newItemId);
      toggleItem(index);
    },
    // The removeItem function is called from a SwitcherItem when it has been unloaded so that we
    // can remove it from the itemStates array
    removeItem: itemId => {
      itemStates.splice(itemStates.findIndex(i => i.itemId === itemId), 1);
      toggleItem(index);
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

  function toggleItem(atIndex) {
    if (!itemStates.length) {
      return;
    }

    // Make sure the value isn't outside the bounds of the items
    const newIndex = Math.max(0, Math.min(atIndex, itemStates.length - 1));

    // Set items to active or inactive
    itemStates.map((item, itemIndex) => {
      item.active = itemIndex === newIndex;
      item.setActive(item.active);
    });

    // Set the new index value
    index = atIndex;

    dispatch("change", index);
  }
</script>

<div
  {id}
  class={['switcher', className].filter(Boolean).join(' ')}>
  <slot />
</div>
