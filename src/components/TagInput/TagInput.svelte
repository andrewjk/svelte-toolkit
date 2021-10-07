<script>
  import { createEventDispatcher, setContext, tick } from "svelte";

  import TagInputItem from "./TagInputItem.svelte";
  import TagInputValue from "./TagInputValue.svelte";

  import { keyCodes } from "../../utils/key-codes";
  import {
    addDocumentEvent,
    removeDocumentEvent,
  } from "../../utils/document-events";

  export let id = null;
  let className = null;
  export { className as class };

  export let text = "";
  export let values = [];
  export let placeholder = "";
  export let source = [];
  export let items = [];
  export let delay = 300;
  export let minChars = 1;
  export let maxnumber = 0;

  export let tagType = "info";
  export let tagClass = null;

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
            setActive,
          },
        ];
      }
    },
  });

  function buildItemStates(newItems) {
    index = 0;
    const newItemStates = newItems.map((item, index) => {
      return {
        active: index === 0,
        text: typeof item === "object" ? item.text : item,
        value: item,
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
      addDocumentEvent("click", handleCloseClick);
    } else {
      input.focus();
      removeDocumentEvent("click", handleCloseClick);
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
        if (expanded) {
          setValue(index);
        } else if (!itemStates || !itemStates.length) {
          addValue(text);
        }
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
      case keyCodes.space: {
        if (!itemStates || !itemStates.length) {
          e.preventDefault();
          addValue(text);
        }
        break;
      }
      case keyCodes.backspace: {
        if (!text) {
          e.preventDefault();
          removeItem(values.length - 1);
        }
        break;
      }
      default: {
        if (maxnumber && values.length >= maxnumber) {
          e.preventDefault();
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
      if (text) {
        // TODO: Set the first option if the list is expanded?
        if (!itemStates || !itemStates.length) {
          addValue(text);
        }
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
      items = source.filter((item) => {
        return isObject ? search.test(item.text) : search.test(item);
      });
      if (!expanded && items.length) {
        toggleList();
      }
    } else {
      dispatch("search", text);
      if (!expanded && items.length) {
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

  function handleRemove(e) {
    removeItem(e.detail);
  }

  function setValue(index) {
    if (index >= 0 && index < itemStates.length) {
      // Add the value to values, clear text, hide the list and focus the textbox
      addValue(itemStates[index].value);
    }
  }

  function addValue(value) {
    // Add the value to values, clear text, hide the list and focus the textbox
    values = values.concat(value);
    text = "";
    input.focus();
    if (expanded) {
      toggleList();
    }
  }

  function removeItem(index) {
    if (index >= 0 && index < values.length) {
      // Remove the value from values and focus the textbox
      values.splice(index, 1);
      values = values;
      input.focus();
    }
  }
</script>

<div
  {id}
  class={["tag-input", "drop-down", className].filter(Boolean).join(" ")}
  bind:this={container}
  role="combobox"
>
  <div bind:this={inputContainer} class="drop-down-input-container" class:focus>
    <div class="tag-input-value-list">
      {#each values as value, index (value)}
        <TagInputValue
          {index}
          class={tagClass}
          type={tagType}
          on:close={handleRemove}
        >
          {typeof value === "object" ? value.text : value}
        </TagInputValue>
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
      on:input={handleInput}
    />
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

<style>
  /* These styles were automatically generated from TagInput.scss */
  .drop-down-list {
    background-color: var(--list-back-color, #fff);
    border: 1px solid var(--border-color, #d2d2d2);
    color: var(--list-text-color, rgba(0, 0, 0, 0.7));
    max-height: 24.4rem;
    overflow: auto;
    position: absolute;
    z-index: 10000;
  }

  .input-button {
    color: var(--label-text-color, #777);
    cursor: pointer;
    line-height: var(--input-height, 3.2rem);
    width: 2.6rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .input-button:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .drop-down-input-container {
    border: 1px solid var(--border-color, #d2d2d2);
    border-radius: var(--border-radius, 2px);
    display: flex;
  }

  .drop-down-input-container.focus {
    border: 1px solid var(--focus-color, #8fc5ff);
    box-shadow: 0px 0px 1px var(--select-color, #3396ff);
  }

  .drop-down-input-container.primary {
    border-color: var(--primary-color, #fd3f92);
  }

  .drop-down-input-container.primary.focus {
    box-shadow: 0px 0px 2px var(--primary-color, #fd3f92);
  }

  .drop-down-input-container.info {
    border-color: var(--info-color, #4d90fe);
  }

  .drop-down-input-container.info.focus {
    box-shadow: 0px 0px 2px var(--info-color, #4d90fe);
  }

  .drop-down-input-container.success {
    border-color: var(--success-color, #00a852);
  }

  .drop-down-input-container.success.focus {
    box-shadow: 0px 0px 2px var(--success-color, #00a852);
  }

  .drop-down-input-container.warning {
    border-color: var(--warning-color, #f3c42e);
  }

  .drop-down-input-container.warning.focus {
    box-shadow: 0px 0px 2px var(--warning-color, #f3c42e);
  }

  .drop-down-input-container.danger {
    border-color: var(--danger-color, #ee2e24);
  }

  .drop-down-input-container.danger.focus {
    box-shadow: 0px 0px 2px var(--danger-color, #ee2e24);
  }

  input.drop-down-input {
    -webkit-appearance: none;
    border: 0;
    height: calc(var(--input-height, 3.2rem) - 2px);
    margin: 0;
    padding: 0 4px;
    width: 100%;
  }

  input.drop-down-input:focus {
    box-shadow: none;
    border: 0;
  }

  .tag-input-value-list {
    white-space: nowrap;
  }
</style>
