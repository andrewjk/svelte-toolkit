<script>
  import {
    onMount,
    beforeUpdate,
    setContext,
    createEventDispatcher
  } from "svelte";

  import { keyCodes } from "../../utils/key-codes";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let multiple = false;
  export let value = -1;

  const dispatch = createEventDispatcher();

  // A collection containing the expanded state and some functions for each item
  const itemStates = [];

  // HACK: This seems like bad code, but I don't know how to handle events from items that are
  // declared in slots
  setContext("accordion", {
    // The registerItem function is called from each AccordionItem to register itself with this
    // Accordion. They pass us some methods that we can call, and we pass them their index in the
    // itemStates collection along with a toggleItem method that they can call when their header
    // is clicked
    registerItem: (setExpanded, setFocused) => {
      itemStates.push({ expanded: false, setExpanded, setFocused });
      return {
        index: itemStates.length - 1,
        toggleItem,
        handleHeaderKey
      };
    }
  });

  onMount(() => {
    // Set the initial expanded item
    toggleItem(value);
  });

  beforeUpdate(() => {
    // Update expanded items, in case the value property has been changed externally
    let sanitizedValue = value;
    if (multiple) {
      if (
        typeof sanitizedValue === "string" ||
        sanitizedValue instanceof String
      ) {
        sanitizedValue = sanitizedValue
          .split(",")
          .map(index => parseInt(index));
      } else if (!Array.isArray(sanitizedValue)) {
        sanitizedValue = [sanitizedValue];
      }
      for (let i = 0; i < itemStates.length; i++) {
        itemStates[i].expanded = sanitizedValue.indexOf(i) !== -1;
        itemStates[i].setExpanded(itemStates[i].expanded);
      }
    } else {
      for (let i = 0; i < itemStates.length; i++) {
        itemStates[i].expanded = sanitizedValue === i;
        itemStates[i].setExpanded(itemStates[i].expanded);
      }
    }
  });

  function toggleItem(index) {
    // Toggle items
    itemStates.map((item, itemIndex) => {
      if (multiple) {
        // The item is expanded if it has the supplied index (i.e. if it was clicked) or if it was
        // already expanded
        item.expanded = itemIndex === index ? !item.expanded : item.expanded;
      } else {
        // The item is expanded if it has the supplied index (i.e. if it was clicked) and if it
        // wasn't already expanded (i.e. we collapse it if it was expanded and clicked)
        item.expanded = itemIndex === index && !item.expanded;
      }
      item.setExpanded(item.expanded);
    });

    // Set the value property
    if (multiple) {
      // Set the value to an array containing the indexes of expanded items
      value = itemStates
        .map((item, index) => (item.expanded ? index : -1))
        .filter(item => item !== -1)
        .sort();
    } else {
      // Set the value to the index of the expanded item (or -1 if nothing is selected)
      value = itemStates.findIndex(item => item.expanded);
    }

    dispatch("change", value);
  }

  function handleFocus(e) {
    const el = e.target.getElementsByTagName("button")[0];
    if (el) {
      el.focus();
      e.preventDefault();
    }
  }

  function handleHeaderKey(index, e) {
    switch (e.keyCode) {
      case keyCodes.up: {
        if (index > 0) {
          itemStates[index - 1].setFocused();
          e.preventDefault();
        }
        break;
      }
      case keyCodes.down: {
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
  class={['accordion', className].concat(classNames).filter(Boolean).join(' ')}
  tabindex="0"
  on:focus={handleFocus}>
  <slot />
</div>
