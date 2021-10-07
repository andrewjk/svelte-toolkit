<script>
  import { setContext, onMount } from "svelte";

  import { keyCodes } from "../../utils/key-codes";

  export let id = null;
  let className = null;
  export { className as class };
  export let tagName = "button";

  let container = null;

  // A collection containing the expanded state and some functions for each item
  let itemStates = [];

  onMount(() => {
    container.querySelectorAll(tagName).forEach((el) => (el.tabIndex = -1));
  });

  // HACK: This seems like bad code, but I don't know how to handle events from items that are
  // declared in slots
  setContext("focusgroup", {
    // The registerItem function is called from each FocusGroupItem to register itself with this
    // FocusGroup. They pass us some methods that we can call, and we pass them their index in the
    // itemStates collection along with a handleItemKey method that they can call when a key is pressed
    registerItem: (setFocused) => {
      itemStates = [...itemStates, { setFocused }];
      return {
        index: itemStates.length - 1,
        tagName,
        handleItemKey,
      };
    },
  });

  function handleFocus(e) {
    if (itemStates.length) {
      itemStates[0].setFocused();
      e.preventDefault();
    }
  }

  function handleItemKey(index, e) {
    switch (e.keyCode) {
      case keyCodes.left: {
        if (index > 0) {
          itemStates[index - 1].setFocused();
          e.preventDefault();
        }
        break;
      }
      case keyCodes.right: {
        if (index < itemStates.length - 1) {
          itemStates[index + 1].setFocused();
          e.preventDefault();
        }
        break;
      }
      case keyCodes.home: {
        if (index > 0) {
          itemStates[0].setFocused();
          e.preventDefault();
        }
        break;
      }
      case keyCodes.end: {
        if (index < itemStates.length - 1) {
          itemStates[itemStates.length - 1].setFocused();
          e.preventDefault();
        }
        break;
      }
    }
  }
</script>

<div
  {id}
  class={["focus-group", className].filter(Boolean).join(" ")}
  bind:this={container}
  tabindex="0"
  on:focus={handleFocus}
>
  <slot />
</div>

<style>
  /* These styles were automatically generated from FocusGroup.scss */
  .focus-group {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
