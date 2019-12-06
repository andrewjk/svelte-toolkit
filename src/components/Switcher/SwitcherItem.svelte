<script>
  import { getContext, createEventDispatcher, onDestroy } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];

  const dispatch = createEventDispatcher();

  let active;
  let itemID;

  // Register this item with the parent Switcher, which will handle toggling active for all items
  const { registerItem, removeItem } = getContext("switcher");
  registerItem(setActive, setItemID);

  // This function is called by the parent Switcher to set this item's active value
  function setActive(value) {
    if (active !== value) {
      active = value;
      dispatch("activeChange", value);
    }
  }

  // This function is called by the parent Switcher to set this item's ID
  function setItemID(newItemID) {
    itemID = newItemID;
  }

  onDestroy(() => {
    removeItem(itemID);
  });
</script>

<style>
  .switcher-item {
    display: none;
  }

  .switcher-item.active {
    display: block;
  }
</style>

<div
  {id}
  class={['switcher-item', className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}
  class:active
  tabindex="0">
  <slot />
</div>
