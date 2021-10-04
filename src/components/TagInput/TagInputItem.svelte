<script>
  import { createEventDispatcher, getContext } from "svelte";
  import { keyCodes } from "../../utils/key-codes";

  export let id = null;
  let className = null;
  export { className as class };

  export let index = 0;
  export let active = false;

  let item;

  const dispatch = createEventDispatcher();

  // Register this item with the parent TagInput, which will handle toggling active for all items
  const { registerItem } = getContext("taginput");
  registerItem(index, setActive);

  // This function is called by the parent TagInput to set this item's active value
  function setActive(value) {
    if (active !== value) {
      active = value;
      if (active) {
        scrollIntoView();
      }
      dispatch("activeChange", value);
    }
  }

  // From https://stackoverflow.com/a/45851497
  function scrollIntoView() {
    const container = item.parentNode;
    if (item.offsetTop < container.scrollTop) {
      container.scrollTop = item.offsetTop;
    } else {
      const offsetBottom = item.offsetTop + item.offsetHeight;
      const scrollBottom = container.scrollTop + container.offsetHeight;
      if (offsetBottom > scrollBottom) {
        container.scrollTop = offsetBottom - container.offsetHeight;
      }
    }
  }
</script>

<div
  {id}
  class={["drop-down-item", className].filter(Boolean).join(" ")}
  bind:this={item}
  class:active
  role="option"
  on:click={(e) => dispatch("select", index)}
>
  <slot />
</div>

<style src="TagInputItem.scss">
</style>
