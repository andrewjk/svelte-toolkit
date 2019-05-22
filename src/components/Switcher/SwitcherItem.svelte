<script>
  import { getContext, createEventDispatcher } from "svelte";

  export let id = null;
  export let className = null;

  const dispatch = createEventDispatcher();

  let active;

  // Register this item with the parent Switcher, which will handle toggling active for all items
  const { registerItem } = getContext("switcher");
  registerItem(setActive);

  // This function is called by the parent Switcher to set this item's active value
  function setActive(value) {
    if (active !== value) {
      active = value;
      dispatch("activeChanged", value);
    }
  }
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
  class={['switcher-item', className].filter(Boolean).join(' ')}
  class:active
  tabindex="0">
  <slot />
</div>
