<script>
  import {
    onMount,
    beforeUpdate,
    setContext,
    createEventDispatcher
  } from "svelte";

  import { keyCodes } from "../../utils/key-codes";

  export let id = null;
  export let className = null;
  export let value = 0;
  export let boxed = false;

  const dispatch = createEventDispatcher();

  // TODO: Need to be able to fill this with headers from slots
  // A collection containing the active state for each item
  $: itemStates = [];

  // HACK: This seems like bad code, but I don't know how to handle events from items that are
  // declared in slots
  setContext("tabGroup", {
    // The registerItem function is called from each TabItem to register itself with this
    // TabGroup. They pass us their header, as well as a setActive method that we can call
    registerItem: (id, header, setActive) => {
      itemStates = [...itemStates, { active: false, id, header, setActive }];
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

  function handleClick(e) {
    // HACK: Is there a better way to get the index?
    const index = parseInt(e.target.dataset.index);
    toggleItem(index);
  }

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

    // Toggle items
    itemStates.map((item, itemIndex) => {
      // The item is active if it has the supplied index (i.e. if it was clicked)
      item.active = itemIndex === sanitizedValue;
      item.setActive(item.active);
    });

    // TODO: Force reactivity so that the tab buttons get aria-selected set
    itemStates = itemStates;

    // Set the value to the index of the active item
    value = index;

    dispatch("change", value);
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
    aria-label="TODO: maybe a property?"
    tabindex="0"
    on:focus={handleFocus}>
    {#each itemStates as item, index}
      <button
        id={item.id ? item.id + '-tab' : null}
        class="button tab-list-button"
        class:active={item.active}
        role="tab"
        aria-selected={item.active}
        tabindex="-1"
        aria-controls={item.id}
        data-index={index}
        on:click={handleClick}
        on:keydown={handleKey}>
         {item.header}
      </button>
    {/each}
  </div>
  <slot />
</div>
