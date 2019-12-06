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
  export let classNames = [];
  export let index = 0;

  const dispatch = createEventDispatcher();

  // A collection containing the active state and some functions for each item
  const itemStates = [];

  let itemid = 0;

  // HACK: This seems like bad code, but I don't know how to handle events from items that are
  // declared in slots
  setContext("switcher", {
    // The registerItem function is called from each SwitcherItem to register itself with this
    // Switcher. They pass us a setActive method that we can call and let us know when they have
    // been unloaded so that we can remove them from the itemStates array
    registerItem: (setActive, setItemID) => {
      const newitemid = itemid++;
      itemStates.push({ itemid: newitemid, active: false, setActive });
      setItemID(newitemid);
    },
    removeItem: itemid => {
      itemStates.splice(itemStates.findIndex(i => i.itemid === itemid), 1);
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

    dispatch("change", index);
  }
</script>

<div
  {id}
  class={['switcher', className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}>
  <slot />
</div>
