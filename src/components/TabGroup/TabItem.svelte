<script>
  import { getContext, createEventDispatcher } from "svelte";

  export let id = null;
  export let className = null;
  export let header = null;

  const dispatch = createEventDispatcher();

  let active;

  // Register this item with the parent TabGroup, which will handle toggling active for all items
  const { registerItem } = getContext("tabGroup");
  registerItem(id, header, setActive);

  // This function is called by the parent TabGroup to set this item's active value
  function setActive(value) {
    if (active !== value) {
      active = value;
      dispatch("activeChange", value);
    }
  }
</script>

<style>
  .tab-item {
    display: none;
  }

  .tab-item.active {
    display: block;
  }
</style>

<div
  {id}
  class={['tab-item', className].filter(Boolean).join(' ')}
  class:active
  role="tabpanel"
  aria-labelledby={id ? id + '-tab' : ''}>
  <slot />
</div>
