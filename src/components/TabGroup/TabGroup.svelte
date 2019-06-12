<script>
  import {
    onMount,
    beforeUpdate,
    setContext,
    createEventDispatcher
  } from "svelte";

  import TabHeader from "./TabHeader.svelte";
  import { keyCodes } from "../../utils/key-codes";

  export let id = null;
  let className = null;
  export { className as class };
  export let ariaLabel = "";
  export let value = 0;
  export let boxed = false;

  const dispatch = createEventDispatcher();

  // TODO: Need to be able to fill this with headers from slots
  // A collection containing the active state for each item
  let itemStates = [];
  let headerStates = [];

  // HACK: This seems like bad code, but I don't know how to handle events from items that are
  // declared in slots
  setContext("tabGroup", {
    // The registerItem function is called from each TabItem to register itself with this
    // TabGroup. They pass us their header, as well as a setActive method that we can call
    registerItem: (id, header, setActive) => {
      itemStates = [...itemStates, { active: false, id, header, setActive }];
    },
    registerHeader: (id, setActive) => {
      headerStates = [...headerStates, { active: false, id, setActive }];
    }
  });

  onMount(() => {
    // Set the initial active item
    toggleItem(value);
  });

  beforeUpdate(() => {
    // Update active items, in case the value property has been changed externally
    toggleItem(value);
  });

  function toggleItem(index) {
    if (!itemStates.length) {
      return;
    }

    let sanitizedValue = index;

    // Make sure the value isn't outside the bounds of the items
    if (sanitizedValue < 0) {
      sanitizedValue = 0;
    } else if (sanitizedValue > itemStates.length - 1) {
      sanitizedValue = itemStates.length - 1;
    }

    // Toggle items and headers
    itemStates.map((item, itemIndex) => {
      // The item is active if it has the supplied index (i.e. if it was clicked)
      item.active = itemIndex === sanitizedValue;
      item.setActive(item.active);
    });

    headerStates.map((item, itemIndex) => {
      // The item is active if it has the supplied index (i.e. if it was clicked)
      item.active = itemIndex === sanitizedValue;
      item.setActive(item.active);
    });

    // Set the value to the index of the active item
    value = index;

    dispatch("change", value);
  }

  function handleClick(e) {
    // HACK: Is there a better way to get the index?
    const index = parseInt(e.target.dataset.index);
    toggleItem(index);
  }

  function handleFocus(e) {
    const el = e.target.childNodes[0];
    if (el) {
      el.focus();
      e.preventDefault();
    }
  }

  function handleKey(e) {
    switch (e.keyCode) {
      case keyCodes.left: {
        const el = e.target.previousElementSibling;
        if (el) {
          el.focus();
          e.preventDefault();
        }
        break;
      }
      case keyCodes.right: {
        const el = e.target.nextElementSibling;
        if (el) {
          el.focus();
          e.preventDefault();
        }
        break;
      }
      case keyCodes.home: {
        const el = e.target.parentNode.firstElementChild;
        if (el) {
          el.focus();
          e.preventDefault();
        }
        break;
      }
      case keyCodes.end: {
        const el = e.target.parentNode.lastElementChild;
        if (el) {
          el.focus();
          e.preventDefault();
        }
        break;
      }
    }
  }
</script>

<style>
  .tab-list {
    border-bottom: 1px solid #ddd;
    cursor: pointer;
  }

  .tab-list-button.active {
    font-weight: bold;
  }
</style>

<div {id} class={['tab-group', className].filter(Boolean).join(' ')}>
  <div
    class="tab-list"
    class:boxed
    role="tablist"
    aria-label={ariaLabel}
    tabindex="0"
    on:focus={handleFocus}>
    {#each itemStates as item, index}
      <TabHeader
        id={item.id}
        content={item.header}
        {index}
        active={item.active}
        on:click={handleClick}
        on:keydown={handleKey} />
    {/each}
  </div>
  <slot />
</div>
