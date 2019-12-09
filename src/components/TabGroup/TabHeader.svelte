<script>
  import { getContext, createEventDispatcher } from "svelte";

  export let itemId;
  let className = null;
  export { className as class };
  export let active = false;
  export let boxed = false;

  // ID in this case is a special prop that can't be set by the user because it's used for aria fields
  let id = `${itemId}-header`;

  const dispatch = createEventDispatcher();

  // Register this item with the parent TabGroup, which will handle toggling active for all items
  const context = getContext("tabGroup");
  boxed = context.boxed;
  const { registerHeader, toggleItemId, handleKey } = context;
  registerHeader(id, setActive);

  // This function is called by the parent TabGroup to set this item's active value
  function setActive(value) {
    if (active !== value) {
      active = value;
      dispatch("activeChange", value);
    }
  }

  function handleClick() {
    toggleItemId(itemId);
  }
</script>

<style src="TabHeader.scss">

</style>

<button
  {id}
  class={['button', 'tab-list-button', boxed ? 'boxed' : null, className].filter(Boolean).join(' ')}
  class:active
  type="button"
  role="tab"
  aria-selected={active}
  tabindex="-1"
  aria-controls={itemId}
  on:click={handleClick}
  on:keydown={handleKey}>
  <slot />
</button>
