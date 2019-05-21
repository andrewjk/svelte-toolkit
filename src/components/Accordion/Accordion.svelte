<script>
  import { onMount, beforeUpdate, setContext } from "svelte";

  export let id = null;
  export let className = null;
  export let multiple = false;
  export let value = -1;

  // A collection containing the expanded state for each item
  const itemState = [];

  // HACK: This seems like bad code, but I don't know how to handle events from items that are
  // declared in slots
  setContext("accordion", {
    // The registerItem function is called from each AccordionItem to register itself with this
    // Accordion. They pass us a setExpanded method that we can call, and we pass them their
    // index in the itemState collection along with a toggleItem method that they can call when
    // their header is clicked
    registerItem: setExpanded => {
      itemState.push({ expanded: false, setExpanded });
      return {
        index: itemState.length - 1,
        toggleItem
      };
    }
  });

  beforeUpdate(() => {
    // Update expanded items, in case the value property has been changed externally
    // HACK: Children are mounted in reverse order?
    let sanitizedValue = value;
    if (multiple) {
      if (
        typeof sanitizedValue === "string" ||
        sanitizedValue instanceof String
      ) {
        sanitizedValue = sanitizedValue.split(",");
      } else if (!Array.isArray(sanitizedValue)) {
        sanitizedValue = [sanitizedValue];
      }
      sanitizedValue = sanitizedValue.map(
        index => itemState.length - index - 1
      );
      for (let i = 0; i < itemState.length; i++) {
        itemState[i].expanded = sanitizedValue.indexOf(i) !== -1;
        itemState[i].setExpanded(itemState[i].expanded);
      }
    } else {
      sanitizedValue =
        sanitizedValue !== -1 ? itemState.length - sanitizedValue - 1 : -1;
      for (let i = 0; i < itemState.length; i++) {
        itemState[i].expanded = sanitizedValue === i;
        itemState[i].setExpanded(itemState[i].expanded);
      }
    }
  });

  function toggleItem(index) {
    // Toggle items
    itemState.map((item, itemIndex) => {
      if (multiple) {
        // The item is expanded if it has the supplied index (i.e. if it was clicked) or if it
        // was already expanded
        item.expanded = itemIndex === index ? !item.expanded : item.expanded;
      } else {
        // The item is expanded if it has the supplied index (i.e. if it was clicked) and if it
        // wasn't already expanded (i.e. we collapse it if it was expanded and clicked)
        item.expanded = itemIndex === index && !item.expanded;
      }
      item.setExpanded(item.expanded);
    });

    // Set the value property
    // HACK: Children are mounted in reverse order?
    if (multiple) {
      // Set the value to an array containing the indexes of expanded items
      value = itemState
        .map((item, index) =>
          item.expanded ? itemState.length - index - 1 : -1
        )
        .filter(item => item !== -1)
        .sort();
    } else {
      // Set the value to the index of the expanded item (or -1 if nothing is selected)
      const index = itemState.findIndex(item => item.expanded);
      value = index !== -1 ? itemState.length - index - 1 : -1;
    }
  }
</script>

<div {id} class={['accordion', className].filter(Boolean).join(' ')}>
  <slot />
</div>
