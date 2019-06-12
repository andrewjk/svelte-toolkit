<script>
  import { getContext, createEventDispatcher } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let content = "";
  export let index = -1;
  export let active = false;

  const dispatch = createEventDispatcher();

  // Register this item with the parent TabGroup, which will handle toggling active for all items
  const { registerHeader } = getContext("tabGroup");
  registerHeader(id, setActive);

  // This function is called by the parent TabGroup to set this item's active value
  function setActive(value) {
    if (active !== value) {
      active = value;
      dispatch("activeChange", value);
    }
  }
</script>

<button
  id={id ? id + '-tab' : null}
  class="button tab-list-button"
  class:active
  role="tab"
  aria-selected={active}
  tabindex="-1"
  aria-controls={id}
  data-index={index}
  on:click
  on:keydown>
  <slot>{content}</slot>
</button>
