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
  let list;

  async function toggleList() {
    expanded = !expanded;
    await tick();
    if (list) {
      list.style.width = container.offsetWidth + "px";
    }
  }

  function handleButtonClick() {
    toggleList();
  }

  // TODO: If expanded, need to change the selected date
  function handleInputKey(e) {
    switch (e.keyCode) {
      case keyCodes.enter: {
        if (expanded) {
          // Don't submit the form
          e.preventDefault();
          expanded = false;
        }
      }
      case keyCodes.esc: {
        // Hide the drop-down list
        if (expanded) {
          expanded = false;
        }
      }
      case keyCodes.left: {
        if (expanded) {
          // Move to the date one day before
          const newValue = value ? new Date(value) : new Date();
          setValue(
            new Date(newValue.setTime(newValue.getTime() - 1 * 86400000))
          );
        }
      }
      case keyCodes.up: {
        if (expanded) {
          // Move to the date seven days before
          const newValue = value ? new Date(value) : new Date();
          setValue(
            new Date(newValue.setTime(newValue.getTime() - 7 * 86400000))
          );
        }
      }
      case keyCodes.right: {
        if (expanded) {
          // Move to the date one day after
          const newValue = value ? new Date(value) : new Date();
          setValue(
            new Date(newValue.setTime(newValue.getTime() + 1 * 86400000))
          );
        }
      }
      case keyCodes.down: {
        if (expanded) {
          // Move to the date seven days after
          const newValue = value ? new Date(value) : new Date();
          setValue(
            new Date(newValue.setTime(newValue.getTime() + 7 * 86400000))
          );
        } else {
          toggleList();
        }
      }
    }
  }

  function handleInputBlur(e) {
    const input = e.target.value;
    setValue(parseDateTime(input, dateOrder));
  }

  function setValue(date) {
    value = date;
  }

  function dateSelected(date) {
    value = date.detail;
    expanded = false;
  }
</script>

<div
  {id}
  class={['date-picker', 'drop-down', className].filter(Boolean).join(' ')}>
  <div bind:this={container} class="drop-down-input-container">
    <input
      class="drop-down-input"
      value={formatDate(value, dateFormat)}
      on:keydown={handleInputKey}
      on:blur={handleInputBlur} />
    <div class="drop-down-button" on:click={handleButtonClick}>
      <ChevronDown />
    </div>
  </div>
  {#if expanded}
    <div bind:this={list} class="drop-down-list">
      <Calendar selectable={true} {startOfWeek} on:change={dateSelected} />
    </div>
  {/if}
</div>
