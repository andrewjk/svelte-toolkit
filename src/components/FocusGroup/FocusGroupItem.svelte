<script>
  import { getContext } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };

  let container = null;

  // Register this item with the parent FocusGroup, which will handle toggling expanded for all items
  const { registerItem } = getContext("focusgroup");
  const result = registerItem(setFocused);
  // The index of this item in the parent FocusGroup's state collection, which is passed to the parent:
  const index = result.index;
  const tagName = result.tagName;
  // The method on the parent FocusGroup to call when a key is pressed:
  const handleItemKey = result.handleItemKey;

  // This function is called by the parent FocusGroup to focus this item's button
  function setFocused() {
    //container.focus();
    const elements = container.querySelectorAll(tagName);
    if (elements && elements.length) {
      elements.forEach((el) => el.focus());
    }
  }

  function handleKey(e) {
    // Pass the key press up to the parent FocusGroup which will handle setting the focused button
    handleItemKey(index, e);
  }
</script>

<div
  {id}
  class={["focus-group-item", className].filter(Boolean).join(" ")}
  bind:this={container}
  on:keydown={handleKey}
>
  <slot />
</div>

<style src="FocusGroupItem.scss">
</style>
