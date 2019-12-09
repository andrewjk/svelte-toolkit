<script>
  import { getContext, onMount, createEventDispatcher } from "svelte";

  export let id;
  let className = null;
  export { className as class };
  export let header = null;
  export let active = false;

  const dispatch = createEventDispatcher();

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

<style src="TabItem.scss">

</style>

<div
  {id}
  class={['tab-item', className].filter(Boolean).join(' ')}
  class:active
  role="tabpanel"
  aria-labelledby={`${id}-header`}>
  <slot />
</div>
