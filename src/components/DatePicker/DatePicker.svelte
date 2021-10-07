<script>
  import { onMount, tick } from "svelte";

  import ChevronDown from "../../icons/ChevronDown/ChevronDown.svelte";
  import Calendar from "../Calendar/Calendar.svelte";

  import { parseDateTime, formatDate } from "../../utils/date-utils";
  import { keyCodes } from "../../utils/key-codes";
  import {
    addDocumentEvent,
    removeDocumentEvent,
  } from "../../utils/document-events";

  export let id = null;
  let className = null;
  export { className as class };

  export let value = null;
  export let placeholder = "";
  export let autofocus = false;
  export let startOfWeek = 1;
  export let dateFormat = "d MMM yyyy";
  export let dateOrder = "mdy";

  let expanded = false;
  let focus = false;
  let container;
  let inputContainer;
  let input;
  let list;

  onMount(() => {
    // We're manually focussing in onMount for two reasons:
    // 1. to avoid an overly-broad accessibility warning (there are instances where autofocus is desirable)
    // 2. to enable autofocus when an item is dynamically added to a page (e.g. adding a new item at the bottom of a list)
    if (autofocus) {
      input.focus();
    }
  });

  async function toggleList() {
    expanded = !expanded;
    await tick();
    if (expanded) {
      list.style.width = inputContainer.offsetWidth + "px";
      list.childNodes[0].focus();
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

  function handleButtonClick() {
    toggleList();
  }

  function handleInputKey(e) {
    switch (e.keyCode) {
      case keyCodes.esc:
      case keyCodes.up: {
        e.preventDefault();
        if (expanded) {
          toggleList();
        }
      }
      case keyCodes.down: {
        e.preventDefault();
        if (!expanded) {
          toggleList();
        }
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
      const input = e.target.value;
      if (input) {
        setValue(parseDateTime(input, dateOrder));
      } else {
        setValue(null);
      }
    }
  }

  function setValue(date) {
    // Set the date part of the value only (in case something else is handling the time part)
    value = new Date(value);
    value.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function dateSelected(date) {
    setValue(date.detail);
    if (expanded) {
      toggleList();
    }
  }
</script>

<div
  {id}
  class={["date-picker", "drop-down", className].filter(Boolean).join(" ")}
  bind:this={container}
>
  <div bind:this={inputContainer} class="drop-down-input-container" class:focus>
    <input
      class="drop-down-input"
      value={formatDate(value, dateFormat)}
      bind:this={input}
      {placeholder}
      on:keydown={handleInputKey}
      on:focus={handleInputFocus}
      on:blur={handleInputBlur}
    />
    <div class="input-button" on:click={handleButtonClick}>
      <slot name="button">
        <ChevronDown />
      </slot>
    </div>
  </div>
  {#if expanded}
    <div bind:this={list} class="drop-down-list">
      <Calendar
        selectable={true}
        {value}
        {startOfWeek}
        on:change={dateSelected}
        on:close={toggleList}
      />
    </div>
  {/if}
</div>

<style>
  /* These styles were automatically generated from DatePicker.scss */
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

  .drop-down-list {
    max-height: initial;
  }
</style>
