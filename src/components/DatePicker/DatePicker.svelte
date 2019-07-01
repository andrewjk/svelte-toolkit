<script>
  import { tick } from "svelte";

  import ChevronDown from "../Icons/ChevronDown.svelte";
  import Calendar from "../Calendar/Calendar.svelte";

  import { parseDateTime, formatDate } from "../../utils/date-utils";
  import { keyCodes } from "../../utils/key-codes";

  export let id = null;
  let className = null;
  export { className as class };
  export let value = null;
  export let expanded = false;

  export let startOfWeek = 1;
  export let dateFormat = "d MMM yyyy";
  export let dateOrder = "mdy";

  let container;
  let input;
  let list;

  async function toggleList() {
    expanded = !expanded;
    await tick();
    if (expanded) {
      list.style.width = container.offsetWidth + "px";
      list.childNodes[0].focus();
    } else {
      input.focus();
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
        // Hide the drop-down list
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
    if (expanded) {
      toggleList();
    }
  }

  function handleInputBlur(e) {
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
    value = date;
  }

  function dateSelected(date) {
    value = date.detail;
    if (expanded) {
      toggleList();
    }
  }
</script>

<div
  {id}
  class={['date-picker', 'drop-down', className].filter(Boolean).join(' ')}>
  <div bind:this={container} class="drop-down-input-container">
    <input
      class="drop-down-input"
      value={formatDate(value, dateFormat)}
      bind:this={input}
      on:keydown={handleInputKey}
      on:focus={handleInputFocus}
      on:blur={handleInputBlur} />
    <div class="drop-down-button" on:click={handleButtonClick}>
      <ChevronDown />
    </div>
  </div>
  {#if expanded}
    <div bind:this={list} class="drop-down-list">
      <Calendar
        selectable={true}
        {startOfWeek}
        on:change={dateSelected}
        on:close={toggleList} />
    </div>
  {/if}
</div>
