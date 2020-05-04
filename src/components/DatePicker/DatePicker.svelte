<script>
  import { onMount, tick } from "svelte";

  import ChevronDown from "../../icons/ChevronDown";
  import Calendar from "../Calendar/Calendar";

  import { parseDateTime, formatDate } from "../../utils/date-utils";
  import { keyCodes } from "../../utils/key-codes";

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

<style src="DatePicker.scss">

</style>

<div
  {id}
  class={['date-picker', 'drop-down', className].filter(Boolean).join(' ')}
  bind:this={container}>
  <div bind:this={inputContainer} class="drop-down-input-container" class:focus>
    <input
      class="drop-down-input"
      value={formatDate(value, dateFormat)}
      bind:this={input}
      {placeholder}
      on:keydown={handleInputKey}
      on:focus={handleInputFocus}
      on:blur={handleInputBlur} />
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
        on:close={toggleList} />
    </div>
  {/if}
</div>
