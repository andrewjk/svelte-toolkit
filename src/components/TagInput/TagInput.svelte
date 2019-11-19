<script>
  import { createEventDispatcher, setContext, tick } from "svelte";
  import { keyCodes } from "../../utils/key-codes";

  import TagInputItem from "./TagInputItem.svelte";
  import TagInputValue from "./TagInputValue.svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];

  export let text = "";
  export let values = [];
  export let placeholder = "";
  export let source = [];
  export let items = [];
  export let delay = 300;
  export let minChars = 1;

  let expanded = false;
  let focus = false;
  let index = 0;
  let container;
  let inputContainer;
  let input;
  let list;
  let timeout = -1;
  let skipSearch = false;

  $: itemStates = buildItemStates(items);

  const dispatch = createEventDispatcher();

  // HACK: This seems like bad code, but I don't know how to handle events from items that are
  // declared in slots
  setContext("taginput", {
    // The registerItem function is called from each TagInputItem to register itself with this
    // TagInput. They pass us their index, along with a setActive method that we can call
    registerItem: (index, setActive) => {
      if (items.length) {
        itemStates[index].setActive = setActive;
      } else {
        itemStates = [
          ...itemStates,
          {
            active: itemStates.length === 0,
            setActive
          }
        ];
      }
    }
  });

  function buildItemStates(newItems) {
    index = 0;
    const newItemStates = newItems.map((item, index) => {
      return {
        active: index === 0,
        text: typeof item === "object" ? item.text : item
      };
    });
    if (newItemStates.length && !expanded) {
      toggleList();
    }
    return newItemStates;
  }

  async function toggleList(focus) {
    expanded = !expanded;
    await tick();
    if (expanded) {
      list.style.width = inputContainer.offsetWidth + "px";
      if (focus) {
        list.childNodes[0].focus();
      }
      document.addEventListener("click", handleCloseClick);
    } else {
      input.focus();
      document.removeEventListener("click", handleCloseClick);
    }
  }

  function handleCloseClick(e) {
    if (!container.contains(e.target)) {
      toggleList();
    }
  }

  function handleInputKey(e) {
    switch (e.keyCode) {
      case keyCodes.esc: {
        e.preventDefault();
        if (expanded) {
          toggleList();
        }
        break;
      }
      case keyCodes.enter: {
        e.preventDefault();
        setValue(index);
        break;
      }
      case keyCodes.up: {
        e.preventDefault();
        if (expanded) {
          toggleItem(index - 1);
        }
        break;
      }
      case keyCodes.down: {
        e.preventDefault();
        if (!expanded && itemStates && itemStates.length) {
          toggleList();
        } else {
          toggleItem(index + 1);
        }
        break;
      }
    }
  }

  function handleInputFocus(e) {
    focus = true;
    if (expanded) {
      toggleList();
    }
  }

  function handleInputBlur(e) {
    focus = false;
    if (!expanded) {
      const text = e.target.value;
      if (text) {
        // TODO: Set the first option?
      }
    }
  }

  function handleInput(e) {
    if (timeout) {
      clearTimeout(timeout);
    }
    const text = input.value;
    if (expanded && !text) {
      toggleList();
    } else if (text.length >= minChars) {
      timeout = setTimeout(search, delay);
    }
  }

  function handleSelect(e) {
    const newIndex = e.detail;
    toggleItem(newIndex);
    setValue(newIndex);
  }

  function search() {
    if (skipSearch) {
      skipSearch = false;
      return;
    }

    const text = input.value;
    if (source && source.length) {
      const isObject = typeof source[0] === "object";
      const search = new RegExp(
        text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
        "i"
      );
      items = source.filter(item => {
        return isObject ? search.test(item.text) : search.test(item);
      });
      if (!expanded && items.length) {
        toggleList();
      }
    } else {
      dispatch("search", text);
      // HACK: How to tell if items were set?
      if (!expanded) {
        toggleList();
      }
    }
  }

  function toggleItem(atIndex) {
    if (!itemStates.length) {
      return;
    }

    let sanitizedValue = atIndex;

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

    // Set the value to the index of the active item
    index = atIndex;

    dispatch("change", index);
  }

  // ===

  //function setValue(index) {
  //  if (index >= 0 && index < itemStates.length) {
  //    skipSearch = true;
  //    value = itemStates[index].text;
  //    if (expanded) {
  //      toggleList();
  //    }
  //  }
  //}

  function handleClose(e) {
    removeItem(e.detail);
  }

  function setValue(index) {
    if (index >= 0 && index < itemStates.length) {
      // Add the value to values, clear text, hide the list and focus the textbox
      values = values.concat([itemStates[index].text]);
      text = "";
      input.focus();
      if (expanded) {
        toggleList();
      }
    }
  }

  function removeItem(index) {
    if (index >= 0 && index < itemStates.length) {
      // Remove the value from values and focus the textbox
      values.splice(index, 1);
      values = values;
      input.focus();
    }
  }
</script>

<style src="TagInput.scss">

</style>

<div
  {id}
  class={['tag-input', 'drop-down', className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}
  bind:this={container}
  role="combobox">
  <div bind:this={inputContainer} class="drop-down-input-container" class:focus>
    <div class="tag-input-value-list">
      {#each values as value, index (value)}
        <TagInputValue {index} on:close={handleClose}>{value}</TagInputValue>
      {/each}
    </div>
    <input
      class="drop-down-input"
      bind:value={text}
      bind:this={input}
      {placeholder}
      on:keydown={handleInputKey}
      on:focus={handleInputFocus}
      on:blur={handleInputBlur}
      on:input={handleInput} />
  </div>
  {#if expanded}
    <div bind:this={list} class="drop-down-list">
      <slot>
        {#each itemStates as item, index}
          <TagInputItem active={item.active} {index} on:select={handleSelect}>
             {item.text}
          </TagInputItem>
        {/each}
      </slot>
    </div>
  {/if}
</div>
