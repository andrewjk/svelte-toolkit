<script>
  import { getContext, onMount, createEventDispatcher } from "svelte";

  export let id;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let header = null;
  export let active = false;

  const dispatch = createEventDispatcher();

  // Register this item with the parent TabGroup, which will handle toggling active for all items
  const { registerItem } = getContext("tabGroup");
  registerItem(id, header, setActive);

  // Move this item's header into the right div
  onMount(() => {
    const headerEl = document.getElementById(`${id}-header`);
    const tempEl = document.getElementById(`${id}-temp`);
    if (!headerEl || !tempEl) {
      throw "a tab item was created without an id and its header could not be found";
    }
    while (tempEl.firstChild) {
      headerEl.appendChild(tempEl.firstChild);
    }
    tempEl.parentNode.removeChild(tempEl);
  });

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
  class={['tab-item', className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}
  class:active
  role="tabpanel"
  aria-labelledby={`${id}-header`}>
  <slot />
</div>

<!-- The contents of this div will be moved into the TabHeader in onMount -->
<div id={`${id}-temp`} style="display: none">
  <slot name="header">{header}</slot>
</div>
