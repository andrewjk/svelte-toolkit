<script>
  import { getContext, createEventDispatcher, onDestroy } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };

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

<div
  {id}
  class={["switcher-item", className].filter(Boolean).join(" ")}
  class:active
  tabindex="0"
>
  <slot />
</div>

<style>
  /* These styles were automatically generated from SwitcherItem.scss */
  .switcher-item {
    display: none;
  }

  .switcher-item.active {
    display: block;
  }
</style>
