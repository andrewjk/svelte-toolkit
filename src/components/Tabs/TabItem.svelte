<script>
  import { getContext } from "svelte";

  export let id = null;
  export let className = null;
  export let header = null;

  let active;

  // Register this item with the parent Tabs, which will handle toggling active for all items
  const { registerItem } = getContext("tabs");
  registerItem(id, header, setActive);

  // This function is called by the parent Tabs to set this item's active value
  function setActive(value) {
    active = value;
  }
</script>

<style>
  .tab-panel {
    display: none;
  }

  .tab-panel.active {
    display: block;
  }
</style>

<div
  {id}
  class={['tab-item', active ? 'active' : '', className].filter(Boolean).join(' ')}
  role="tabpanel"
  aria-labelledby={id ? id + '-tab' : ''}
  tabindex="0">
  <slot />
</div>
