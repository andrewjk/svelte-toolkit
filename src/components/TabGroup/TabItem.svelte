<script>
  import { getContext, onMount, createEventDispatcher } from "svelte";

  export let id;
  let className = null;
  export { className as class };
  export let header = null;
  export let active = false;

  const dispatch = createEventDispatcher();

  // Register this item with the parent TabGroup, which will handle toggling active for all items
  const { registerItem } = getContext("tabgroup");
  registerItem(id, header, setActive);

  // This function is called by the parent TabGroup to set this item's active value
  function setActive(value) {
    if (active !== value) {
      active = value;
      dispatch("activeChange", value);
    }
  }
</script>

<div
  {id}
  class={["tab-item", className].filter(Boolean).join(" ")}
  class:active
  role="tabpanel"
  aria-labelledby={`${id}-header`}
>
  <slot />
</div>

<style>
  /* These styles were automatically generated from TabItem.scss */
  .tab-item {
    display: none;
    padding: var(--element-padding, 2rem) 0;
  }

  .tab-item.active {
    display: block;
  }
</style>
